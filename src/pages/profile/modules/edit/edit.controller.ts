import bus from '../../../../modules/event-bus';

import Input from '../../../../components/input';
import Button from '../../../../components/button';

import data from './edit.model';

export default class RegisterController {
  controls: Record<string, Record<string, Input | Button>>;

  constructor() {
    this.controls = {
      inputs: {
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          value: data.login,
          events: {
            input(e: InputEvent) {
              bus.emit('edit:set-field-data', 'login', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'login');
            }
          }
        }),
        email: new Input({
          inputClassName: 'fieldset__input',
          name: 'email',
          value: data.email,
          events: {
            input(e: InputEvent) {
              bus.emit('edit:set-field-data', 'email', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'email');
            }
          }
        }),
        phone: new Input({
          inputClassName: 'fieldset__input',
          name: 'phone',
          value: data.phone,
          events: {
            input(e: InputEvent) {
              bus.emit('edit:set-field-data', 'phone', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'phone');
            }
          }
        }),
        first_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'first_name',
          value: data.first_name,
          events: {
            input(e: InputEvent) {
              bus.emit('edit:set-field-data', 'first_name', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'first_name');
            }
          }
        }),
        second_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'second_name',
          value: data.second_name,
          events: {
            input(e: InputEvent) {
              bus.emit('edit:set-field-data', 'second_name', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('edit:check-field', 'second_name');
            }
          }
        })
      },
      buttons: {
        save: new Button({
          text: 'Save',
          status: 'success',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('edit:check-form');
            }
          }
        })
      }
    };
  }
}
