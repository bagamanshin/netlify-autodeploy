import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const chatUsersAPIInstance = new HTTP('/chats/users');

class ChatUsersAPI extends BaseAPI {
  update(users: number[], chatId: number): Promise<RequestResult> {
    return chatUsersAPIInstance
      .put('/', { data: { users, chatId } });
  }

  delete(users: number[], chatId: number): Promise<RequestResult> {
    return chatUsersAPIInstance
      .delete('/', { data: { users, chatId } });
  }
}

export default new ChatUsersAPI();
