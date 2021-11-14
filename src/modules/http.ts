/* eslint-disable no-unused-vars */
/* eslint-disable-next-line */
enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  });

  return result;
}

function queryStringify(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map((arr) => arr.join('=')).join('&');
}

type OptionsType = {
  headers: Record<string, string>;
  method: keyof typeof METHODS;
  data: any;
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
    const { headers = { 'Content-Type': 'application/json' }, method, data } = options;

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
