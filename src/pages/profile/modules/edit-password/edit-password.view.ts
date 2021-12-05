import Handlebars from 'handlebars';

import { Block, bus } from '../../../../modules';

import layout from '../../../../layout/profile';
import template from './edit-password.tmpl';

import EditPasswordController from './edit-password.controller';

import setInputValidationStatus from '../../../../utils/inputValidationStatus';
import render from '../../../../utils/renderDOM';

const editPasswordController = new EditPasswordController();
type InputType = keyof typeof editPasswordController.controls.inputs;

export default class ProfileEditPasswordPage extends Block {
  constructor() {
    super('div', { className: 'card profile profile--edit-password' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  hide() {
    Block.prototype.hide.call(this);
    Object.keys(editPasswordController.controls.inputs).forEach((field: InputType) => {
      setInputValidationStatus.call(this, editPasswordController.controls.inputs, field, 'valid');
    });
  }

  renderDOM(rootQuery: string) {
    layout.renderDOM(rootQuery);

    bus.on('edit-password:valid-field', (field: InputType) => {
      setInputValidationStatus.call(this, editPasswordController.controls.inputs, field, 'valid');
    });

    bus.on('edit-password:invalid-field', (field: InputType) => {
      setInputValidationStatus.call(this, editPasswordController.controls.inputs, field, 'invalid');
    });

    bus.on('edit-password:reset-check-results', () => {
      Object.keys(editPasswordController.controls.inputs).forEach((field: InputType) => {
        setInputValidationStatus.call(this, editPasswordController.controls.inputs, field, 'valid');
      });
    });

    render('.profile-container', this);

    render('.profile--edit-password .fieldset--old_password', editPasswordController.controls.inputs.old_password);
    render('.profile--edit-password .fieldset--new_password', editPasswordController.controls.inputs.new_password);

    render('.profile--edit-password .actions', editPasswordController.controls.buttons.save);
  }
}
