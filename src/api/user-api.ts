import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const userAPIInstance = new HTTP('/auth');

class UserAPI extends BaseAPI {
  request(): Promise<RequestResult> {
    return userAPIInstance
      .get('/user');
  }
}

export default new UserAPI();
