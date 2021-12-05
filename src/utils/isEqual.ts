import isArrayOrObject from './isArrayOrObject';

export default function isEqual(lhs: any, rhs: any) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  /* eslint-disable-next-line */
  for (const [key, value] of Object.entries(lhs)) {
    if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
      return false;
    }
    const rightValue = rhs[key as keyof typeof rhs];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value, rightValue)) {
        /* eslint-disable-next-line */
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
