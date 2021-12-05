type Indexed<T = any> = {
  [key in string]: T;
};

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const isObject = (obj: unknown): boolean => !!(obj && typeof obj === 'object');

  if (!isObject(lhs) || !isObject(rhs)) {
    return rhs;
  }

  Object.keys(rhs).forEach((key) => {
    const targetValue = lhs[key];
    const sourceValue = rhs[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      // eslint-disable-next-line
      lhs[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      // eslint-disable-next-line
      lhs[key] = merge({ ...targetValue }, sourceValue as Indexed);
    } else {
      // eslint-disable-next-line
      lhs[key] = sourceValue;
    }
  });

  return lhs;
}
