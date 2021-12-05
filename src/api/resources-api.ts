import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const userAPIInstance = new HTTP('/resources');

class ResourcesAPI extends BaseAPI {
  request(path: string): Promise<RequestResult> {
    return userAPIInstance
      .get(`${path}`, { blob: true });
  }
}

export default new ResourcesAPI();
