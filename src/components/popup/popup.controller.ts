import { bus } from '../../modules';

import Button from '../button';
import Input from '../input';

import chatsApi from '../../api/chats-api';

import { CreateChatRequest } from '../../types';

export default class PopupController {
  controls: Record<string, Record<string, Button | Input >>;

  constructor() {
    this.controls = {
      inputs: {
        title: new Input({
          inputClassName: 'fieldset__input',
          events: {
            input: (e: InputEvent) => {
              bus.emit('popup-create-chat:set-field-data', 'title', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('popup-create-chat:check-field', 'title');
            }
          }
        })
      },
      buttons: {
        close: new Button({
          className: 'popup__inner__form-actions__close',
          text: 'Close',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('popup:hide');
            }
          }
        }),
        create: new Button({
          className: 'popup__inner__form-actions__create',
          text: 'Create',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('popup-create-chat:check-form');
            }
          }
        })
      }
    };
    bus.on('popup-create-chat:create-chat', (data: CreateChatRequest) => {
      this.controls.buttons.create.setProps({ disabled: true });
      chatsApi.create(data).then(() => {
        this.controls.buttons.create.setProps({ disabled: false });
        bus.emit('popup:hide');
        bus.emit('chats:fetch-chats');
      });
    });
  }
}
