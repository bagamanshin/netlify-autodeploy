import { HTTP } from '../modules';
import errorHandler from '../utils/decorators/errorHandler';
import BaseAPI from './base-api';

const logoutAPIInstance = new HTTP('/auth');

class LogoutAPI extends BaseAPI {
  @errorHandler
  request() {
    return logoutAPIInstance.post('/logout');
  }
}

export default new LogoutAPI();
