import { bus } from '..';
import Methods from '../../enums/Methods';

import { RequestOptions } from '../../types/RequestOptions';
import { RequestResult } from '../../types/RequestResult';

import queryStringify from '../../utils/queryStringify';

const DEFAULT_REQUEST_OPTIONS = {
  method: Methods.GET,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  credentials: true,
  blob: false,
  timeout: 5000
};

function parseXHRResult(xhr: XMLHttpRequest): RequestResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.response,
    json: <T>() => JSON.parse(xhr.responseText) as T,
    response: xhr
  };
}

function errorResponse(
  xhr: XMLHttpRequest,
  message: string | null = null
): RequestResult {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: <T>() => JSON.parse(message || xhr.statusText) as T,
    response: xhr.response
  };
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export default class HTTPTransport {
  _baseUrl: string;

  constructor(basePath: string) {
    this._baseUrl = BASE_URL + basePath;
  }

  get = (url: string, options: Partial<RequestOptions> = {}) => this
    .request(this._baseUrl + url, { ...options, method: Methods.GET });

  post = (url: string, options: Partial<RequestOptions> = {}) => this
    .request(this._baseUrl + url, { ...options, method: Methods.POST });

  put = (url: string, options: Partial<RequestOptions> = {}) => this
    .request(this._baseUrl + url, { ...options, method: Methods.PUT });

  delete = (url: string, options: Partial<RequestOptions> = {}) => this
    .request(this._baseUrl + url, { ...options, method: Methods.DELETE });

  request = (url: string, options: Partial<RequestOptions> = {}): Promise<RequestResult> => {
    const {
      headers = DEFAULT_REQUEST_OPTIONS.headers,
      method = DEFAULT_REQUEST_OPTIONS.method,
      timeout = DEFAULT_REQUEST_OPTIONS.timeout,
      credentials = DEFAULT_REQUEST_OPTIONS.credentials,
      blob = DEFAULT_REQUEST_OPTIONS.blob,
      data
    } = options;

    return new Promise<RequestResult>((resolve) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object
        .keys(headers)
        .forEach(
          (key) => xhr.setRequestHeader(key, headers[key])
        );

      xhr.onload = () => {
        resolve(parseXHRResult(xhr));

        const { status } = xhr;
        switch (status) {
          case 401:
            bus.emit('user:logged', false);
            bus.emit('navigateTo', '/');
            break;

          case 404:
            bus.emit('navigateTo', '/404');
            break;

          case 500:
            bus.emit('navigateTo', '/500');
            break;

          default:
            break;
        }
      };

      if (credentials) {
        xhr.withCredentials = true;
      }

      if (blob) {
        xhr.responseType = 'blob';
      }

      xhr.timeout = timeout;

      xhr.onerror = () => {
        resolve(errorResponse(xhr, 'Failed to make request.'));
      };

      xhr.ontimeout = () => {
        resolve(errorResponse(xhr, 'Request took longer than expected.'));
      };

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
