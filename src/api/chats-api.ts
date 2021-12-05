import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult, CreateChatRequest } from '../types';

const chatsAPIInstance = new HTTP('/chats');

class ChatsAPI extends BaseAPI {
  create(data: CreateChatRequest): Promise<RequestResult> {
    return chatsAPIInstance
      .post('/', { data });
  }

  request(): Promise<RequestResult> {
    return chatsAPIInstance
      .get('/');
  }
}

export default new ChatsAPI();
