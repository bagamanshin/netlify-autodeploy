// import { ArrayOrObject } from './types/ArrayOrObject';

export default function cloneDeep(obj: any) {
  // eslint-disable-next-line
  return (function _cloneDeep(item: any): any {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== 'object') {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    // Handle:
    // * File
    if (item instanceof File) {
      return new File([item], item.name, { type: item.type });
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: any[] = [];

      item.forEach((_, i) => {
        copy[i] = _cloneDeep(item[i]);
      });

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(_cloneDeep(k), _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: Record<string | symbol, any> = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach((s) => {
        copy[s] = _cloneDeep(item[s]);
      });

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach((k) => {
        copy[k] = _cloneDeep(item[k]);
      });

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
