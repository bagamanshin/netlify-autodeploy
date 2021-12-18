import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';
import errorHandler from '../utils/decorators/errorHandler';

const chatAPIInstance = new HTTP('/chats/token');

class ChatConnectionAPI extends BaseAPI {
  @errorHandler
  create(chatId: number): Promise<RequestResult> {
    return chatAPIInstance
      .post(`/${chatId}`);
  }
}

export default new ChatConnectionAPI();
