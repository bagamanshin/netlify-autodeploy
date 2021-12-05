import Handlebars from 'handlebars';

import './login.scss';

import { Block, bus } from '../../modules';

import render from '../../utils/renderDOM';

import layout from '../../layout/main';
import template from './login.tmpl';

import LoginController from './login.controller';

import setInputValidationStatus from '../../utils/inputValidationStatus';

const loginController = new LoginController();

type InputType = keyof typeof loginController.controls.inputs;

export default class LoginPage extends Block {
  constructor() {
    super('div', { className: 'login' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  hide() {
    Block.prototype.hide.call(this);
    Object.keys(loginController.controls.inputs).forEach((field: InputType) => {
      setInputValidationStatus.call(this, loginController.controls.inputs, field, 'valid');
    });
  }

  renderDOM(rootQuery: string): void {
    layout.renderDOM(rootQuery);

    bus.on('login:valid-field', (field: InputType) => {
      setInputValidationStatus.call(this, loginController.controls.inputs, field, 'valid');
    });
    bus.on('login:invalid-field', (field: InputType) => {
      setInputValidationStatus.call(this, loginController.controls.inputs, field, 'invalid');
    });
    bus.on('login:reset-check-results', () => {
      Object.keys(loginController.controls.inputs).forEach((field: InputType) => {
        setInputValidationStatus.call(this, loginController.controls.inputs, field, 'valid');
      });
    });

    render('.main-container', this);

    render('.login .fieldset--login', loginController.controls.inputs.login);
    render('.login .fieldset--password', loginController.controls.inputs.password);

    render('.login .form-actions', loginController.controls.links.goToRegisterPage, 'before');
    render('.login .form-actions', loginController.controls.buttons.login);
  }
}
