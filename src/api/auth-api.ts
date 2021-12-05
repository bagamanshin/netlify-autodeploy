import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { LoginRequest, RegisterRequest, RequestResult } from '../types';

const authAPIInstance = new HTTP('/auth');

class AuthAPI extends BaseAPI {
  create(user: RegisterRequest): Promise<RequestResult> {
    return authAPIInstance.post('/signup', { data: user });
  }

  request(user: LoginRequest): Promise<RequestResult> {
    return authAPIInstance.post('/signin', { data: user });
  }

  logout() {
    return authAPIInstance.post('/logout');
  }
}

export default new AuthAPI();
