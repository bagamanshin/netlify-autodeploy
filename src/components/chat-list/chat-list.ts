import { Block, bus } from '../../modules';

import authService from '../../modules/services/auth';
import chatService from '../../modules/services/chat';

import ChatItem from '../chat-item/chat-item';

import { MessageAuthorIdentity } from '../../enums';

import './chat-list.scss';

import { IBlockProps } from '../../modules/Block/types';

interface IChatListProps {}

export default class ChatList extends Block<HTMLDivElement, IChatListProps> {
  constructor(
    props: IChatListProps & Partial<IBlockProps & HTMLDivElement>
  ) {
    const wrapClass = 'chatlist__items';
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });

    bus.on('chats:chat-selected', () => {
      this._render();
    });
    bus.on('chats:chats-updated', () => {
      this._render();
    });
  }

  render() {
    const { chats, selectedChat } = chatService;

    const selectedChatId = selectedChat && selectedChat.chat_id;

    const wrap = document.createElement('div');
    wrap.classList.add('chatlist__content-box');

    const currentUserEmail = authService.getCurrentUser().email;
    chats.forEach((chat) => {
      const lastMessageAuthorEmail = chat.last_message && chat.last_message.user.email;
      const chatInstance = new ChatItem({
        ...chat,
        active: selectedChatId === chat.chat_id,
        lastMessageSender: currentUserEmail === lastMessageAuthorEmail
          ? MessageAuthorIdentity.you : MessageAuthorIdentity['not-you']
      });
      chatInstance
        .getContent()
        .setAttribute('data-chat-id', chat.chat_id.toString());
      wrap.append(chatInstance.getContent());
    });

    return wrap;
  }
}
