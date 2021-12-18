import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult, UserRequest } from '../types';
import errorHandler from '../utils/decorators/errorHandler';

const userProfileAPIInstance = new HTTP('/user/profile');

class UserProfileAPI extends BaseAPI {
  @errorHandler
  update(data: UserRequest): Promise<RequestResult> {
    return userProfileAPIInstance.put('/', {
      data
    });
  }
}

export default new UserProfileAPI();
