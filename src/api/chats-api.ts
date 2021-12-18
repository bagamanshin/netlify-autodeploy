import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult, CreateChatRequest } from '../types';
import errorHandler from '../utils/decorators/errorHandler';

const chatsAPIInstance = new HTTP('/chats');

class ChatsAPI extends BaseAPI {
  @errorHandler
  create(data: CreateChatRequest): Promise<RequestResult> {
    return chatsAPIInstance
      .post('/', { data });
  }

  @errorHandler
  request(): Promise<RequestResult> {
    return chatsAPIInstance
      .get('/');
  }
}

export default new ChatsAPI();
