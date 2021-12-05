import { bus } from '../../modules';

import Input from '../../components/input';
import Link from '../../components/link';
import ChatList from '../../components/chat-list';
import Popup from '../../components/popup';
import ChatWindow from '../../components/chat-window';
import PopupAddUsers from '../../components/popup-add-users';
import PopupRemoveUsers from '../../components/popup-remove-users';

import chatService from '../../modules/services/chat';

import chatUsersApi from '../../api/chat-users-api';

bus.on('popup-add-users:add-users-start', (users: number[]) => {
  if (!chatService.selectedChat) {
    console.log('No chat ID');
    return;
  }

  chatUsersApi.update(users, chatService.selectedChat.chat_id).then(() => {
    bus.emit('popup-add-users:add-users-end');
  });
});

bus.on('popup-remove-users:remove-users-start', (users: number[]) => {
  if (!chatService.selectedChat) {
    console.log('No chat ID');
    return;
  }

  chatUsersApi.delete(users, chatService.selectedChat.chat_id).then(() => {
    bus.emit('popup-remove-users:remove-users-end');
  });
});

export default class ChatsController {
  controls: Record<string, Record<string, Input | Link >>;

  components: {
    chats: ChatList;
    chatWindow: ChatWindow
    popups: Record<string, Popup | PopupAddUsers>
  };

  constructor() {
    this.controls = {
      inputs: {
        search: new Input({
          name: 'search',
          placeholder: 'Search',
          inputClassName: 'chatlist__head__input',
          events: {
            input: (e: InputEvent) => {
              bus.emit('chats:set-field-data', 'search', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
            }
          }
        })
      },
      links: {
        goToProfilePage: new Link({
          className: 'text--pinky',
          text: 'Profile >',
          href: '/settings'
        })
      }
    };
    this.components = {
      chats: new ChatList({
        events: {
          click: (event: MouseEvent) => {
            const el: HTMLElement | null = (event.target as HTMLElement).closest('[data-chat-id]');

            if (el) {
              bus.emit('chats:chat-select', chatService.chats.find((chat) => chat.chat_id === +(el).dataset.chatId!));
              return;
            }
            bus.emit('chats:chat-select', null);
          }
        }
      }),
      chatWindow: new ChatWindow({}),
      popups: {
        'create-chat': new Popup({}),
        'add-users': new PopupAddUsers({}),
        'remove-users': new PopupRemoveUsers({})
      }
    };
  }
}
