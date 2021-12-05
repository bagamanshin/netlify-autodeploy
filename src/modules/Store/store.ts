import cloneDeep from '../../utils/cloneDeep';

import isPlainObject from '../../utils/isPlainObject';
import Block from '../Block/block';
import { EventBus } from '../EventBus/event-bus';

// type Prev = [never, 0, 1, 2, ...0[]]

// type Join<K, P> = K extends string | number ?
//   P extends string | number ?
//   `${K}${'' extends P ? '' : '.'}${P}`
//   : never : never;

// type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
//   { [K in keyof T]-?: K extends string | number ?
//     // eslint-disable-next-line
//       `${K}` | Join<K, Paths<T[K], Prev[D]>>
//       : never
//   }[keyof T] : ''

class Store<initStoreGenericType extends object> {
  private __state: initStoreGenericType;

  private __observingMap: Record<string, Block[]>;

  eventBus: EventBus;

  constructor(initState: initStoreGenericType) {
    if (!initState) {
      throw Error('There is need a initState!');
    }
    const eventBus = new EventBus();

    Object.defineProperty(this, 'eventBus', {
      get() {
        return eventBus;
      }
    });

    this.__state = cloneDeep(initState);

    const subscribersNeedUpdate = new Set<Block>();

    eventBus.on('prop-changing-start', () => {
      console.log('Start changing store');
    });

    eventBus.on('subscribers-need-update', (subscribers: []) => {
      subscribers.forEach((subscriber) => subscribersNeedUpdate.add(subscriber));
    });

    eventBus.on('prop-changing-end', () => {
      // a little bit dirty approach
      subscribersNeedUpdate.forEach((subscriber) => subscriber._render());
      subscribersNeedUpdate.clear();
    });
  }

  commit<T>(newValue: T, path: string) {
    this.eventBus.emit('prop-changing-start');

    if (isPlainObject(newValue)) {
      Object.entries(newValue).forEach(([key, value]) => {
        if (isPlainObject(value)) {
          // going deeper
          this.commit(value, `${path}.${key}`);
        }
        this._setToState(value, `${path}.${key}`);
      });
    } else {
      this._setToState(newValue, path);
    }

    this.eventBus.emit('prop-changing-end');
  }

  _setToState(value: unknown, path: string): void | Error {
    if (!path) {
      throw new Error('Attemp to setState along to empty path');
    }

    const directories = path.split('.');
    const lastProp = directories.pop()!;

    let cursor: any = this.__state;
    directories.forEach((directory) => {
      cursor = cursor[directory];
    });

    cursor[lastProp] = cloneDeep(value);

    this.eventBus.emit('subscribers-need-update', this.__observingMap[path]);

    console.log('prop-changed ', path);
  }

  _getFromState(path: string) {
    const directories = path.split('.');
    let cursor: any = this.__state;
    directories.forEach((directory) => {
      cursor = cursor[directory];
    });
    return cursor;
  }

  _subscribe(subscriber: Block, path: string) {
    // eslint-disable-next-line
    if (!(this.__observingMap[path] || (this.__observingMap[path] = [])).includes(subscriber)) {
      this.__observingMap[path].push(subscriber);
    }
  }

  createGetter(path: string) {
    return (subscriber: Block) => {
      this._subscribe(subscriber, path);
      return cloneDeep(this._getFromState(path));
    };
  }
}

const initState = {
  currentUser: {
    id: 8800,
    name: {
      firstName: 'John',
      secondName: 'Smith'
    }
  },
  loading: false
};

const store = new Store(initState);
export default store;
