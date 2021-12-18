import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../EventBus/event-bus';

import isEqual from '../../utils/isEqual';
import { IBlockProps } from './types';

export default abstract class Block<
  T extends HTMLElement = HTMLElement,
  U = IBlockProps
> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_SHOWN: 'flow:shown'
  } as Record<string, string>;

  _element: T;

  _id: string | null = null;

  _meta: { tagName: string; props: Partial<
    U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>> }
  > };

  props: Partial<U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}>;

  eventBus: EventBus;

  constructor(
    tagName: string = 'div',
    props: Partial<U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}> = {}
  ) {
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

  _prepareEventsCallbacks(props: Partial<
      U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}
  >) {
    const { events = {} } = props;

    Object.keys(events).forEach(
      /* eslint-disable-next-line */
      (eventName: keyof GlobalEventHandlersEventMap) => {
        events[eventName] = events[eventName]!.bind(this);
      }
    );
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(
      /* eslint-disable-next-line */
      (eventName: keyof GlobalEventHandlersEventMap) => {
        this._element.removeEventListener(eventName, events[eventName]!);
      }
    );
  }

  _addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(
      /* eslint-disable-next-line */
      (eventName: keyof GlobalEventHandlersEventMap) => {
        this._element.addEventListener(eventName, events[eventName]!, true);
      }
    );
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

  _componentDidUpdate(
    oldProps: U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>},
    newProps: U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}
  ): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(
    /* eslint-disable-next-line */
    oldProps: U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>},
    /* eslint-disable-next-line */
    newProps: U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}
  ): boolean {
    return !isEqual(oldProps, newProps);
  }

  setProps(nextProps: Partial<
    U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}
  >) {
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

    this._removeEvents();
    this._element.innerHTML = '';

    if (block instanceof window.HTMLElement) {
      this._element.append(block);
      this._addEvents();
    } else if (block instanceof Promise) {
      block.then((el: HTMLElement) => {
        this._element.append(el);
        this._addEvents();
      });
    } else {
      this._element.innerHTML = block;
      this._addEvents();
    }
  }

  abstract render(): string | HTMLElement | Promise<HTMLElement>;

  // eslint-disable-next-line
  renderDOM(rootQuery: string): void {}

  getContent(): T {
    return this.element;
  }

  _makePropsProxy = (props: Partial<
    U & T & IBlockProps & { getters: Partial<Record<keyof T, Function>>}
  >) =>
    /* eslint-disable-next-line */
    new Proxy(props, {
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

  shown(): void {}

  show(): void {
    this.getContent().classList.remove('hidden');
  }

  hide(): void {
    this.getContent().classList.add('hidden');
  }
}
