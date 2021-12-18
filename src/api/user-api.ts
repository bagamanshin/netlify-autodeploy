import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';
import errorHandler from '../utils/decorators/errorHandler';

const userAPIInstance = new HTTP('/auth');

class UserAPI extends BaseAPI {
  @errorHandler
  request(): Promise<RequestResult> {
    return userAPIInstance
      .get('/user');
  }
}

export default new UserAPI();
