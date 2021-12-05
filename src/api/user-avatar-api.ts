import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const userAvatarAPIInstance = new HTTP('/user/profile/avatar');

class UserAvatarAPI extends BaseAPI {
  update(data: FormData): Promise<RequestResult> {
    return userAvatarAPIInstance.put('/', {
      data,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  }
}

export default new UserAvatarAPI();
