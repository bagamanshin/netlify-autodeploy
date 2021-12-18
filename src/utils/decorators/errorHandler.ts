import { bus } from '../../modules';
import { RequestResult } from '../../types';

// @ts-ignore
export default function errorHandler(target, propertyKey, descriptor: TypedPropertyDescriptor<any>):
    TypedPropertyDescriptor<any> {
  const originalMethod = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = function fn(this: any) {
    // eslint-disable-next-line prefer-rest-params
    return originalMethod.apply(this, arguments).then((response: RequestResult) => {
      if (!response.ok) {
        bus.emit('notification-open', ({
          type: 'error',
          title: 'Response',
          text: JSON.parse(response.response.response).reason
        }));
      }
      return response;
    });
  };
  return descriptor;
}
