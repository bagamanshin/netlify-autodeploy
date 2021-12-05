import { Chat, ChatResponse } from '../../../types';

import { bus } from '../..';

import chatsApi from '../../../api/chats-api';

import cloneDeep from '../../../utils/cloneDeep';

const data = {
  chats: [],
  selectedChat: null
} as {
  chats: Chat[],
  selectedChat: Chat | null
};

class ChatService {
  constructor() {
    bus.on('chats:chat-select', (chat: Chat | null) => {
      if (this.selectedChat?.chat_id !== chat?.chat_id) {
        data.selectedChat = cloneDeep(chat);
        bus.emit('chats:chat-selected', data.selectedChat && data.selectedChat.chat_id);
      }
    });

    bus.on('chats:update-chats-data', (chats: Chat[]) => {
      data.chats = cloneDeep(chats);
      bus.emit('chats:chats-updated');
    });

    bus.on('chats:reset-selected-chat', () => {
      if (this.selectedChat) {
        bus.emit('chats:chat-select', null);
      }
    });

    bus.on('chats:reset-chats', () => {
      bus.emit('chats:update-chats-data', []);
    });

    bus.on('user:logged', (status: boolean) => {
      if (!status) {
        bus.emit('chats:reset-chats');
        bus.emit('chats:reset-selected-chat');
      }
    });

    bus.on('chats:fetch-chats', () => {
      this.fetchChats();
    });
  }

  fetchChats() {
    chatsApi.request().then((response) => {
      if (response.ok) {
        const chats = response.json<ChatResponse[]>().map((chat) => {
          const mappedChat = {
            chat_id: chat.id,
            title: chat.title,
            avatar: chat.avatar,
            unread_count: chat.unread_count,
            last_message: chat.last_message
          };
          return mappedChat;
        });
        bus.emit('chats:update-chats-data', chats);
      }
    });
  }

  get selectedChat(): Chat | null {
    return cloneDeep(data.selectedChat);
  }

  get chats(): Chat[] {
    return cloneDeep(data.chats);
  }
}

export default new ChatService();
