import Handlebars from 'handlebars';

import Block from '../../../../modules/block';
import render from '../../../../utils/renderDOM';
import bus from '../../../../modules/event-bus';

import ProfileLayout from '../../../../layout/profile';
import template from './edit.tmpl';

import EditController from './edit.controller';

import data from './edit.model';

export default class ProfileEditPasswordPage extends Block {
  constructor() {
    super('div', { className: 'card profile' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({ nickname: data.login });
  }
}

const layout = new ProfileLayout();
const page = new ProfileEditPasswordPage();

const editController = new EditController();

type InputValidationStatus = 'valid' | 'invalid';
type InputType = keyof typeof editController.controls.inputs;

function setInputValidationStatus(field: InputType, status: InputValidationStatus) {
  switch (status) {
    case 'valid':
      editController.controls.inputs[field].setProps({ errorMessage: '' });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.remove('fieldset--error');
      break;
    case 'invalid':
      editController.controls.inputs[field].setProps({ errorMessage: `Incorrect ${field}` });
      page
        .getContent()
        .querySelector(`.fieldset--${field}`)
        ?.classList.add('fieldset--error');
      break;
    default:
      break;
  }
}

bus.on('edit:valid-field', (field: InputType) => {
  setInputValidationStatus(field, 'valid');
});

bus.on('edit:invalid-field', (field: InputType) => {
  setInputValidationStatus(field, 'invalid');
});

bus.on('edit:reset-check-results', () => {
  Object.keys(editController.controls.inputs).forEach((field: InputType) => {
    setInputValidationStatus(field, 'valid');
  });
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', editController.controls.inputs.email);
render('.fieldset--login', editController.controls.inputs.login);
render('.fieldset--first_name', editController.controls.inputs.first_name);
render('.fieldset--second_name', editController.controls.inputs.second_name);
render('.fieldset--phone', editController.controls.inputs.phone);

render('.actions', editController.controls.buttons.save);
