import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const chatAPIInstance = new HTTP('/chats/token');

class ChatConnectionAPI extends BaseAPI {
  create(chatId: number): Promise<RequestResult> {
    return chatAPIInstance
      .post(`/${chatId}`);
  }
}

export default new ChatConnectionAPI();
