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
              bus.emit('popup-remove-users:set-field-data', 'users', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('popup-remove-users:check-field', 'users');
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
              bus.emit('popup-remove-users:hide');
            }
          }
        }),
        remove: new Button({
          className: 'popup__inner__form-actions__remove',
          text: 'Remove',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('popup-remove-users:check-form');
            }
          }
        })
      }
    };
    bus.on('popup-remove-users:remove-users-end', () => {
      this.controls.buttons.remove.setProps({ disabled: false });
      bus.emit('popup-remove-users:hide');
    });
    bus.on('popup-remove-users:remove-users', (users: number[]) => {
      this.controls.buttons.remove.setProps({ disabled: true });
      bus.emit('popup-remove-users:remove-users-start', users);
    });
  }
}
