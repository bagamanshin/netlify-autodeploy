import Handlebars from 'handlebars';

import Block from '../../modules/block';
import render from '../../utils/renderDOM';
import bus from '../../modules/event-bus';

import MainLayout from '../../layout/main';
import template from './register.tmpl';

import RegisterController from './register.controller';

export default class RegisterPage extends Block {
  constructor() {
    super('div', { className: 'register' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new MainLayout();
const page = new RegisterPage();

const registerController = new RegisterController();

type InputValidationStatus = 'valid' | 'invalid';
type InputType = keyof typeof registerController.controls.inputs;

function setInputValidationStatus(field: InputType, status: InputValidationStatus) {
  switch (status) {
    case 'valid':
      registerController.controls.inputs[field].setProps({ errorMessage: '' });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.remove('fieldset--error');
      break;
    case 'invalid':
      registerController.controls.inputs[field].setProps({ errorMessage: `Incorrect ${field}` });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.add('fieldset--error');
      break;
    default:
      break;
  }
}

bus.on('register:valid-field', (field: InputType) => {
  setInputValidationStatus(field, 'valid');
});

bus.on('register:invalid-field', (field: InputType) => {
  setInputValidationStatus(field, 'invalid');
});

bus.on('register:reset-check-results', () => {
  Object.keys(registerController.controls.inputs).forEach((field: InputType) => {
    setInputValidationStatus(field, 'valid');
  });
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', registerController.controls.inputs.email);
render('.fieldset--login', registerController.controls.inputs.login);
render('.fieldset--first_name', registerController.controls.inputs.first_name);
render('.fieldset--second_name', registerController.controls.inputs.second_name);
render('.fieldset--phone', registerController.controls.inputs.phone);
render('.fieldset--password', registerController.controls.inputs.password);
render('.fieldset--repeat_password', registerController.controls.inputs.repeat_password);

render('.form-actions', registerController.controls.buttons.register, 'before');
