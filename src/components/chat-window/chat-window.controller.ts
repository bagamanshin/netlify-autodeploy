import ChatConnectionService from '../../modules/services/chatConnection';
import { bus } from '../../modules';

import Tooltip from '../tooltip';
import Button from '../button';
import Textarea from '../textarea';

bus.on('chat:connect', (selectedChatId: number) => {
  ChatConnectionService.createConnection(selectedChatId);
});

bus.on('chat-window:ready-to-send-message', (data: string) => {
  ChatConnectionService.sendMessage(data);
});

export default class ChatWindowController {
  controls: Record<string, Record<string, Button | Textarea | Tooltip >>;

  constructor() {
    this.controls = {
      inputs: {
        message: new Textarea({
          value: '',
          placeholder: 'Enter text',
          events: {
            input: (e: InputEvent) => {
              bus.emit('chat-window:set-field-data', 'message', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
            }
          }
        })
      },
      buttons: {
        sendMessage: new Button({
          className: 'chat-thread__actions__send',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('chat-window:send-message');
            }
          }
        }),
        createChat: new Button({
          className: 'chat-thread__empty__create__btn',
          text: 'Create a new one!',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('popup:show');
            }
          }
        })
      },
      tooltips: {
        chatSettings: new Tooltip({
          items: {
            'Add user': () => bus.emit('popup-add-users:show'),
            'Remove user': () => bus.emit('popup-remove-users:show')
          }
        })
      }
    };
    bus.on('chat-window:clear-message-input', () => {
      this.controls.inputs.message.setProps({ value: '' });
    });
  }
}
