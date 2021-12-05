import merge from './merge';

import { Indexed } from './types/Indexed';

export default function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  if (typeof path !== 'string') {
    throw Error('path must be string');
  }

  const source = {} as Indexed;
  let cursor = source;
  const pList = path.split('.');
  const len = pList.length;
  // eslint-disable-next-line
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i];
    if (!cursor[elem]) cursor[elem] = {} as Indexed;
    cursor = cursor[elem] as Indexed;
  }

  cursor[pList[len - 1]] = value;

  return merge(object as Indexed, source);
}
