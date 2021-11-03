import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

export interface IBlockProps {
  className?: string;
  /* eslint-disable-next-line */
  events?: Partial<Record<keyof GlobalEventHandlersEventMap, Function>>;
  settings?: {
    withInternalId: boolean;
  };
  __id?: string | null;
}

export default abstract class Block<T extends HTMLElement = HTMLElement, U = IBlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  } as Record<string, string>;

  _element: T;

  _id: string | null = null;

  _meta: { tagName: string; props: Partial<U & T & IBlockProps> };

  props: Partial<U & T & IBlockProps>;

  eventBus: EventBus;

  constructor(tagName: string = 'div', props: Partial<U & T & IBlockProps> = {}) {
    const eventBus = new EventBus();

    /* eslint no-underscore-dangle: 0 */
    this._meta = {
      tagName,
      props
    };

    this._prepareEventsCallbacks(props);

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    if (this.props.settings?.withInternalId) {
      this._id = makeUUID();
    }

    Object.defineProperty(this, 'eventBus', {
      get() {
        return eventBus;
      }
    });

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _prepareEventsCallbacks(props: Partial<U & T & IBlockProps>) {
    const { events = {} } = props;

    Object.keys(events).forEach((eventName) => {
      events[eventName] = events[eventName].bind(this);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName], true);
    });
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(oldProps: U & T & IBlockProps, newProps: U & T & IBlockProps): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(
    /* eslint-disable-next-line */
    oldProps: U & T & IBlockProps,
    /* eslint-disable-next-line */
    newProps: U & T & IBlockProps
  ): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps(nextProps: Partial<U & T & IBlockProps>) {
    if (!nextProps) {
      return;
    }

    const prevProps = { ...this.props };

    Object.assign(this.props, nextProps);

    this.eventBus.emit(
      Block.EVENTS.FLOW_CDU,
      { ...prevProps },
      { ...this.props }
    );
  }

  get element(): T {
    return this._element;
  }

  _render(): void {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напиши свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();
  }

  abstract render(): string;

  getContent(): T {
    return this.element;
  }

  _makePropsProxy = (props: Partial<U & T & IBlockProps>) =>
    /* eslint-disable-next-line */
    new Proxy(props, {
      // get(target, prop: string) {
      //   const value = target[prop];
      //   return typeof value === 'function' ? value.bind(target) : value;
      // },
      // set(target, prop: string, value) {
      //   // Запускаем обновление компоненты
      //   self.eventBus.emit(
      //     Block.EVENTS.FLOW_CDU,
      //     { ...target },
      //     { ...target, [prop]: value }
      //   );
      //   /* eslint-disable-next-line */
      //   target[prop] = value;
      //   return true;
      // },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });

  _createDocumentElement = (tagName: string): T => {
    const element = document.createElement(tagName) as T;

    const { className } = this.props;

    if (className) {
      element.classList.add(...(className as string).split(' '));
    }

    if (this._id) {
      element.setAttribute('data-block-id', this._id);
    }

    return element;
  };

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
