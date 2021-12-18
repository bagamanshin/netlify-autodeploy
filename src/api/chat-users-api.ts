import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';
import errorHandler from '../utils/decorators/errorHandler';

const chatUsersAPIInstance = new HTTP('/chats/users');

class ChatUsersAPI extends BaseAPI {
  @errorHandler
  update(users: number[], chatId: number): Promise<RequestResult> {
    return chatUsersAPIInstance
      .put('/', { data: { users, chatId } });
  }

  @errorHandler
  delete(users: number[], chatId: number): Promise<RequestResult> {
    return chatUsersAPIInstance
      .delete('/', { data: { users, chatId } });
  }
}

export default new ChatUsersAPI();
