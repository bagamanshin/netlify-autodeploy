import bus from '../../modules/event-bus';

import Input from '../../components/input';
import Button from '../../components/button';

export default class LoginController {
  controls: Record<string, Record<string, Input | Button>>;

  constructor() {
    this.controls = {
      inputs: {
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          events: {
            input(e: InputEvent) {
              bus.emit('login:set-field-data', 'login', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('login:check-field', 'login');
            }
          }
        }),
        password: new Input({
          name: 'password',
          type: 'password',
          inputClassName: 'fieldset__input',
          events: {
            input(e: InputEvent) {
              bus.emit('login:set-field-data', 'password', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('login:check-field', 'password');
            }
          }
        })
      },
      buttons: {
        login: new Button({
          text: 'Log in',
          status: 'success',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('login:check-form');
            }
          }
        })
      }
    };
  }
}
