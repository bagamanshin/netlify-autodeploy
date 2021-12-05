import { bus } from '../../../../modules';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

export default class RegisterController {
  controls: Record<string, Record<string, Input | Button>>;

  constructor() {
    bus.on('user:update-password-start', () => {
      this.controls.buttons.save.setProps({ disabled: true });
    });
    bus.on('user:update-password-end', (status: boolean) => {
      this.controls.buttons.save.setProps({ disabled: false });
      if (status) {
        bus.emit('navigateBack');
      }
    });
    this.controls = {
      inputs: {
        old_password: new Input({
          name: 'old_password',
          type: 'password',
          inputClassName: 'fieldset__input',
          events: {
            input(e: InputEvent) {
              bus.emit('edit-password:set-field-data', 'old_password', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit-password:check-field', 'old_password');
            }
          }
        }),
        new_password: new Input({
          name: 'new_password',
          type: 'password',
          inputClassName: 'fieldset__input',
          events: {
            input(e: InputEvent) {
              bus.emit('edit-password:set-field-data', 'new_password', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit-password:check-field', 'new_password');
            }
          }
        })
      },
      buttons: {
        save: new Button({
          text: 'Change password',
          status: 'success',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('edit-password:check-form');
            }
          }
        })
      }
    };
  }
}
