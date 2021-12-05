import { bus } from '../../modules';

import Button from '../button';
import Input from '../input';

export default class PopupAddUsersController {
  controls: Record<string, Record<string, Button | Input >>;

  constructor() {
    this.controls = {
      inputs: {
        users: new Input({
          inputClassName: 'fieldset__input',
          events: {
            input: (e: InputEvent) => {
              bus.emit('popup-add-users:set-field-data', 'users', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('popup-add-users:check-field', 'users');
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
              bus.emit('popup-add-users:hide');
            }
          }
        }),
        add: new Button({
          className: 'popup__inner__form-actions__add',
          text: 'Add',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('popup-add-users:check-form');
            }
          }
        })
      }
    };
    bus.on('popup-add-users:add-users-end', () => {
      this.controls.buttons.add.setProps({ disabled: false });
      bus.emit('popup-add-users:hide');
    });
    bus.on('popup-add-users:add-users', (users: number[]) => {
      this.controls.buttons.add.setProps({ disabled: true });
      bus.emit('popup-add-users:add-users-start', users);
    });
  }
}
