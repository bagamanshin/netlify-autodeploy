import bus from '../../modules/event-bus';

import Input from '../../components/input';
import Button from '../../components/button';
import Textarea from '../../components/textarea';

export default class ChatsController {
  controls: Record<string, Record<string, Input | Button | Textarea>>;

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
        }),
        message: new Textarea({
          events: {
            input: (e: InputEvent) => {
              bus.emit('chats:set-field-data', 'message', (e.target as HTMLInputElement).value);
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
              bus.emit('chats:send-message');
            }
          }
        })
      }
    };
  }
}
