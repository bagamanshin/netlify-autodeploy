import Handlebars from 'handlebars';

import { Block, bus } from '../../modules';

import template from './chat-window.tmpl';

import './chat-window.scss';

import ChatWindowController from './chat-window.controller';
import Message from '../message';

import data from './chat-window.model';

import authService from '../../modules/services/auth';
import chatService from '../../modules/services/chat';

import { IBlockProps } from '../../modules/Block/types';
import { MessageAuthorIdentity } from '../../enums';
import { ChatMessage } from '../../types';

import render from '../../utils/renderDOM';
import getFullTime from '../../utils/getFullTime';

Handlebars.registerHelper('notNull', function (string1, options) {
  if (string1 !== null) {
    return options.fn(this);
  }
  return options.inverse(this);
});

const chatWindowController = new ChatWindowController();

function scrollChatWindowToBottom() {
  const innerHeight = document.querySelector('.chat-thread__messages__inner')?.clientHeight;
  const dialogAreaViewHeight = document.querySelector('.chat-thread__messages')?.clientHeight;
  if (innerHeight && dialogAreaViewHeight) {
    if (innerHeight > dialogAreaViewHeight) {
      document.querySelector('.chat-thread__messages')!.scrollTop = innerHeight - dialogAreaViewHeight;
    }
  }
}

export default class ChatWindow extends Block {
  constructor(
    props: Partial<IBlockProps & HTMLDivElement>
  ) {
    const wrapClass = 'chat-window';
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });

    bus.on('chats:chat-selected', () => {
      this._render();
    });

    bus.on('chat-window:message-received', (message: Record<string, string | number>) => {
      const msg = new Message({
        sender: `${message.user_id}`,
        senderIdentity: authService.getCurrentUserId.toString() === (message.user_id).toString()
          ? MessageAuthorIdentity.you : MessageAuthorIdentity['not-you'],
        content: message.content as string,
        status: 'delivered',
        date: getFullTime(new Date(message.time))
      });
      render('.chat-thread__messages__inner', msg);
      scrollChatWindowToBottom();
    });

    bus.on('chat-window:all-messages-loaded', (messages: ChatMessage[]) => {
      messages.forEach((message) => {
        const msg = new Message({
          sender: `${message.user_id}`,
          senderIdentity: authService.getCurrentUserId.toString() === (message.user_id).toString()
            ? MessageAuthorIdentity.you : MessageAuthorIdentity['not-you'],
          content: message.content as string,
          status: 'delivered',
          date: getFullTime(new Date(message.time))
        });
        render('.chat-thread__messages__inner', msg, 'before');
        scrollChatWindowToBottom();
      });
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);
    const chat = chatService.selectedChat;

    const wrap = document.createElement('div');
    wrap.classList.add('chat-thread');

    wrap.addEventListener('click', (e) => {
      const el = (e.target as HTMLElement).closest('.chat-thread__head__settings')
      || (e.target as HTMLElement).closest('.tooltip');
      if (el) {
        bus.emit('tooltip:show');
      } else {
        bus.emit('tooltip:hide');
      }
    });

    wrap.innerHTML = compiledTemplate({
      chat,
      currentDate: data.currentDate
    });

    if (chat) {
      const actionsContainer = wrap.querySelector('.chat-thread__actions');

      actionsContainer?.append(chatWindowController.controls.inputs.message.getContent());
      actionsContainer?.append(chatWindowController.controls.buttons.sendMessage.getContent());

      const chatSettingsContainer = wrap.querySelector('.chat-thread__head__right');

      chatSettingsContainer?.append(
        chatWindowController.controls.tooltips.chatSettings.getContent()
      );

      bus.emit('chat:connect', chat.chat_id);
    } else {
      const emptyBlockParagraph = wrap.querySelector('.chat-thread__empty__create');
      emptyBlockParagraph?.append(chatWindowController.controls.buttons.createChat.getContent());
    }

    return wrap;
  }
}
