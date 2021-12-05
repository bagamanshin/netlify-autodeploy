import Handlebars from 'handlebars';

import './register.scss';

import { Block, bus } from '../../modules';

import layout from '../../layout/main';
import template from './register.tmpl';

import RegisterController from './register.controller';

import render from '../../utils/renderDOM';
import setInputValidationStatus from '../../utils/inputValidationStatus';

const registerController = new RegisterController();

type InputType = keyof typeof registerController.controls.inputs;

export default class RegisterPage extends Block {
  constructor() {
    super('div', { className: 'register' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  hide() {
    Block.prototype.hide.call(this);
    Object.keys(registerController.controls.inputs).forEach((field: InputType) => {
      setInputValidationStatus.call(this, registerController.controls.inputs, field, 'valid');
    });
  }

  renderDOM(rootQuery: string): void {
    layout.renderDOM(rootQuery);

    bus.on('register:valid-field', (field: InputType) => {
      setInputValidationStatus.call(this, registerController.controls.inputs, field, 'valid');
    });

    bus.on('register:invalid-field', (field: InputType) => {
      setInputValidationStatus.call(this, registerController.controls.inputs, field, 'invalid');
    });

    bus.on('register:reset-check-results', () => {
      Object.keys(registerController.controls.inputs).forEach((field: InputType) => {
        setInputValidationStatus.call(this, registerController.controls.inputs, field, 'valid');
      });
    });

    render('.main-container', this);

    render('.register .fieldset--email', registerController.controls.inputs.email);
    render('.register .fieldset--login', registerController.controls.inputs.login);
    render('.register .fieldset--first_name', registerController.controls.inputs.first_name);
    render('.register .fieldset--second_name', registerController.controls.inputs.second_name);
    render('.register .fieldset--phone', registerController.controls.inputs.phone);
    render('.register .fieldset--password', registerController.controls.inputs.password);
    render('.register .fieldset--repeat_password', registerController.controls.inputs.repeat_password);

    render('.register .form-actions', registerController.controls.buttons.register, 'before');
    render('.register .form-actions', registerController.controls.links.goToLoginPage);
  }
}
