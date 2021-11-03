import Handlebars from 'handlebars';

import Block from '../../modules/block';
import render from '../../utils/renderDOM';
import bus from '../../modules/event-bus';

import MainLayout from '../../layout/main';
import template from './login.tmpl';

import LoginController from './login.controller';

export default class LoginPage extends Block {
  constructor() {
    super('div', { className: 'login' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new MainLayout();
const page = new LoginPage();

const loginController = new LoginController();

type InputValidationStatus = 'valid' | 'invalid';
type InputType = keyof typeof loginController.controls.inputs;

function setInputValidationStatus(field: InputType, status: InputValidationStatus) {
  switch (status) {
    case 'valid':
      loginController.controls.inputs[field].setProps({ errorMessage: '' });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.remove('fieldset--error');
      break;
    case 'invalid':
      loginController.controls.inputs[field].setProps({ errorMessage: `Incorrect ${field}` });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.add('fieldset--error');
      break;
    default:
      break;
  }
}

bus.on('login:valid-field', (field: InputType) => {
  setInputValidationStatus(field, 'valid');
});

bus.on('login:invalid-field', (field: InputType) => {
  setInputValidationStatus(field, 'invalid');
});

bus.on('login:reset-check-results', () => {
  Object.keys(loginController.controls.inputs).forEach((field: InputType) => {
    setInputValidationStatus(field, 'valid');
  });
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--login', loginController.controls.inputs.login);
render('.fieldset--password', loginController.controls.inputs.password);

render('.form-actions', loginController.controls.buttons.login);
