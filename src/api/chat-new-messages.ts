import { HTTP } from '../modules';
import BaseAPI from './base-api';

import { RequestResult } from '../types';

const chatNewMessageAPIInstance = new HTTP('/chats/new');

class ChatNewMessagesAPI extends BaseAPI {
  request(chatId: number): Promise<RequestResult> {
    return chatNewMessageAPIInstance
      .get(`/${chatId}`);
  }
}

export default new ChatNewMessagesAPI();
