import { bus } from '../../modules';

import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';

import authApi from '../../api/auth-api';
import authService from '../../modules/services/auth';

import { LoginRequest } from '../../types';

export default class LoginController {
  controls: Record<string, Record<string, Input | Button | Link>>;

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
      },
      links: {
        goToRegisterPage: new Link({
          className: 'text--pinky',
          text: 'No account?',
          href: '/sign-up'
        })
      }
    };

    bus.on('login:signin', this.signin);
  }

  signin = (user: LoginRequest) => {
    this.controls.buttons.login.setProps({ disabled: true });

    authApi
      .request(user)
      .then((result) => {
        this.controls.buttons.login.setProps({ disabled: false });
        if (result.ok) {
          authService.fetchUser();
        } else {
          console.log('You are NOT logged in!');
        }
      });
  }
}
