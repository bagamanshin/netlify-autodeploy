/* eslint-disable no-unused-vars */
/* eslint-disable-next-line */
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?'
  );
}

type OptionsType = {
  headers: Record<string, string>;
  method: keyof typeof METHODS;
  data:
    | Document
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | null
    | undefined;
  timeout: number;
};

export default class HTTPTransport {
  get = (
    url: string,
    options: Partial<OptionsType> = {}
  ) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (
    url: string,
    options: Partial<OptionsType> = {}
  ) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (
    url: string,
    options: Partial<OptionsType> = {}
  ) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (
    url: string,
    options: Partial<OptionsType> = {}
  ) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (
    url: string,
    options: Partial<OptionsType> = {},
    timeout = 5000
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject): void => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
