import { bus } from '../..';

import chatConnectionApi from '../../../api/chat-connection-api';

import { Message, ChatMessage, Chat } from '../../../types';

import authService from '../auth';

const PING_INTERVAL = 10000;

class ChatConnectionService {
  private socketInstance: WebSocket| null = null;

  // eslint-disable-next-line
  private pingPongIntervalId: undefined | number;

  private initPingPong() {
    this.pingPongIntervalId = window.setInterval(() => {
      this.socketInstance?.send(JSON.stringify({
        type: 'ping'
      }));
    }, PING_INTERVAL);
  }

  private get messagesOffset() {
    return this.messages.length;
  }

  private messages: ChatMessage[] = [];

  private getMessages() {
    this.socketInstance?.send(JSON.stringify({
      content: this.messagesOffset,
      type: 'get old'
    }));
  }

  private initSocketConnection(chatId: number, token: string) {
    const userId = authService.getCurrentUserId;
    this.socketInstance = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    const connectionOpenHandler = () => {
      console.log('Соединение установлено');
      this.initPingPong();
      this.getMessages();
    };

    const messageHandler = (event: MessageEvent<string>) => {
      // console.log('Получены данные', event.data);
      const message = JSON.parse(event.data);

      if (Array.isArray(message)) {
        if ((message).length) {
          this.messages.push(...message as ChatMessage[]);
          this.getMessages();
          return;
        }
        bus.emit('chat-window:all-messages-loaded', this.messages);
      } else if (message.type === 'message') {
        bus.emit('chat-window:message-received', JSON.parse(event.data) as Message);
      }
    };

    const errorHandler = (event: Event) => {
      console.log('Ошибка', event);
    };

    const connectionCloseHandler = (event: CloseEvent) => {
      this.socketInstance = null;

      window.clearInterval(this.pingPongIntervalId);
      this.pingPongIntervalId = undefined;

      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
        this.messages = [];
      } else {
        console.log('Обрыв соединения');
        this.initSocketConnection(chatId, token);
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    };

    this.socketInstance.addEventListener('open', connectionOpenHandler);
    this.socketInstance.addEventListener('close', connectionCloseHandler);
    this.socketInstance.addEventListener('message', messageHandler);
    this.socketInstance.addEventListener('error', errorHandler);
  }

  constructor() {
    bus.on('chats:chat-selected', (chat: Chat | null) => {
      if (this.socketInstance && chat === null) {
        this.socketInstance.close();
      }
    });
  }

  createConnection = (chatId: number) => {
    if (this.socketInstance) {
      this.socketInstance.close();
    }
    chatConnectionApi.create(chatId).then((response) => {
      if (response.ok) {
        const { token } = response.json();
        this.initSocketConnection(chatId, token);
      }
    });
  }

  sendMessage = (message: string) => {
    if (this.socketInstance) {
      this.socketInstance.send(JSON.stringify({
        content: message,
        type: 'message'
      }));
    }
  }
}

export default new ChatConnectionService();
