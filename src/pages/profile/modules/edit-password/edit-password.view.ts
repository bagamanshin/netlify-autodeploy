import Handlebars from 'handlebars';

import Block from '../../../../modules/block';
import render from '../../../../utils/renderDOM';
import bus from '../../../../modules/event-bus';

import ProfileLayout from '../../../../layout/profile';
import template from './edit-password.tmpl';

import EditPasswordController from './edit-password.controller';

export default class ProfileEditPasswordPage extends Block {
  constructor() {
    super('div', { className: 'card profile' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new ProfileLayout();
const page = new ProfileEditPasswordPage();

const editPasswordController = new EditPasswordController();

type InputValidationStatus = 'valid' | 'invalid';
type InputType = keyof typeof editPasswordController.controls.inputs;

function setInputValidationStatus(field: InputType, status: InputValidationStatus) {
  switch (status) {
    case 'valid':
      editPasswordController.controls.inputs[field].setProps({ errorMessage: '' });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.remove('fieldset--error');
      break;
    case 'invalid':
      editPasswordController.controls.inputs[field].setProps({ errorMessage: `Incorrect ${field}` });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.add('fieldset--error');
      break;
    default:
      break;
  }
}

bus.on('edit-password:valid-field', (field: InputType) => {
  setInputValidationStatus(field, 'valid');
});

bus.on('edit-password:invalid-field', (field: InputType) => {
  setInputValidationStatus(field, 'invalid');
});

bus.on('edit-password:reset-check-results', () => {
  Object.keys(editPasswordController.controls.inputs).forEach((field: InputType) => {
    setInputValidationStatus(field, 'valid');
  });
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--old_password', editPasswordController.controls.inputs.old_password);
render('.fieldset--new_password', editPasswordController.controls.inputs.new_password);

render('.actions', editPasswordController.controls.buttons.save);
