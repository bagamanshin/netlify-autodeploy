import bus from '../../modules/event-bus';

import Input from '../../components/input';
import Button from '../../components/button';

export default class RegisterController {
  controls: Record<string, Record<string, Input | Button>>;

  constructor() {
    const instance = this;
    this.controls = {
      inputs: {
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'login', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'login');
            }
          }
        }),
        email: new Input({
          inputClassName: 'fieldset__input',
          name: 'email',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'email', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'email');
            }
          }
        }),
        phone: new Input({
          inputClassName: 'fieldset__input',
          name: 'phone',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'phone', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'phone');
            }
          }
        }),
        first_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'first_name',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'first_name', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'first_name');
            }
          }
        }),
        second_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'second_name',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'second_name', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'second_name');
            }
          }
        }),
        password: new Input({
          name: 'password',
          type: 'password',
          inputClassName: 'fieldset__input',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'password', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'password');
              if ((instance.controls.inputs.repeat_password as Input).props.touched) {
                bus.emit('register:check-field', 'repeat_password');
              }
            }
          }
        }),
        repeat_password: new Input({
          name: 'repeat_password',
          type: 'password',
          inputClassName: 'fieldset__input',
          events: {
            input(e: InputEvent) {
              bus.emit('register:set-field-data', 'repeat_password', (e.target as HTMLInputElement).value);
            },
            blur(e: InputEvent) {
              this.setProps({ value: (e.target as HTMLInputElement).value });
              bus.emit('register:check-field', 'repeat_password');
            }
          }
        })
      },
      buttons: {
        register: new Button({
          text: 'Register',
          status: 'success',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
              bus.emit('register:check-form');
            }
          }
        })
      }
    };
  }
}
