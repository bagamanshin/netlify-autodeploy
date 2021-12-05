import Handlebars from 'handlebars';

import { Block, bus } from '../../../../modules';

import layout from '../../../../layout/profile';
import template from './edit.tmpl';

import EditController from './edit.controller';

import setInputValidationStatus from '../../../../utils/inputValidationStatus';
import render from '../../../../utils/renderDOM';

const editController = new EditController();

type InputType = keyof typeof editController.controls.inputs;

export default class ProfileEditPage extends Block {
  constructor() {
    super('div', { className: 'card profile profile--edit' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  componentDidMount() {
    bus.emit('user:fetch-user');
  }

  show() {
    Block.prototype.show.call(this);

    bus.emit('user:fetch-user');
  }

  hide() {
    Block.prototype.hide.call(this);
    Object.keys(editController.controls.inputs).forEach((field: InputType) => {
      setInputValidationStatus.call(
        this,
        editController.controls.inputs,
        field,
        'valid'
      );
    });

    bus.emit('edit:reset-models');
  }

  renderDOM(rootQuery: string) {
    layout.renderDOM(rootQuery);

    bus.on('edit:valid-field', (field: InputType) => {
      setInputValidationStatus.call(
        this,
        editController.controls.inputs,
        field,
        'valid'
      );
    });

    bus.on('edit:invalid-field', (field: InputType) => {
      setInputValidationStatus.call(
        this,
        editController.controls.inputs,
        field,
        'invalid'
      );
    });

    bus.on('edit:reset-check-results', () => {
      Object.keys(editController.controls.inputs).forEach(
        (field: InputType) => {
          setInputValidationStatus.call(
            this,
            editController.controls.inputs,
            field,
            'valid'
          );
        }
      );
    });

    render('.profile-container', this);

    render(
      '.profile--edit .fieldset--email',
      editController.controls.inputs.email
    );
    render(
      '.profile--edit .fieldset--login',
      editController.controls.inputs.login
    );
    render(
      '.profile--edit .fieldset--first_name',
      editController.controls.inputs.first_name
    );
    render(
      '.profile--edit .fieldset--second_name',
      editController.controls.inputs.second_name
    );
    render(
      '.profile--edit .fieldset--phone',
      editController.controls.inputs.phone
    );
    render(
      '.profile--edit .display_name',
      editController.controls.inputs.display_name
    );

    render(
      '.profile--edit .profile__avatar',
      editController.controls.images.avatar
    );
    render(
      '.profile--edit .profile__avatar',
      editController.controls.inputs.avatar
    );

    render('.profile--edit .actions', editController.controls.buttons.save);
  }
}
