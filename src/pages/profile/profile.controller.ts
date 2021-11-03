import Input from '../../components/input';
import Button from '../../components/button';

import data from './profile.model';

export default class RegisterController {
  controls: Record<string, Record<string, Input | Button>>;

  constructor() {
    this.controls = {
      inputs: {
        login: new Input({
          inputClassName: 'fieldset__input',
          name: 'login',
          value: data.login,
          disabled: true
        }),
        email: new Input({
          inputClassName: 'fieldset__input',
          name: 'email',
          value: data.email,
          disabled: true
        }),
        phone: new Input({
          inputClassName: 'fieldset__input',
          name: 'phone',
          value: data.phone,
          disabled: true
        }),
        first_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'first_name',
          value: data.first_name,
          disabled: true
        }),
        second_name: new Input({
          inputClassName: 'fieldset__input',
          name: 'second_name',
          value: data.second_name,
          disabled: true
        })
      },
      buttons: {
        exit: new Button({
          text: 'Log out',
          status: 'error',
          events: {
            click: (e: MouseEvent) => {
              e.preventDefault();
            }
          }
        })
      }
    };
  }
}
