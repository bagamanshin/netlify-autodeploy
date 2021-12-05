import { HTTP } from '../modules';
import BaseAPI from './base-api';

const logoutAPIInstance = new HTTP('/auth');

class LogoutAPI extends BaseAPI {
  request() {
    return logoutAPIInstance.post('/logout');
  }
}

export default new LogoutAPI();
