import isArray from './isArray';
import isPlainObject from './isPlainObject';

import { PlainObject } from './types/PlainObject';

export default function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}
