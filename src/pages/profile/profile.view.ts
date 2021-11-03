import Handlebars from 'handlebars';

import Block from '../../modules/block';
import render from '../../utils/renderDOM';

import ProfileLayout from '../../layout/profile';
import template from './profile.tmpl';

import ProfileController from './profile.controller';

import data from './profile.model';

export default class ProfilePage extends Block {
  constructor() {
    super('div', { className: 'card profile' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({ nickname: data.login });
  }
}

const layout = new ProfileLayout();
const page = new ProfilePage();

const profileController = new ProfileController();

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', profileController.controls.inputs.email);
render('.fieldset--login', profileController.controls.inputs.login);
render('.fieldset--first_name', profileController.controls.inputs.first_name);
render('.fieldset--second_name', profileController.controls.inputs.second_name);
render('.fieldset--phone', profileController.controls.inputs.phone);

render('.actions', profileController.controls.buttons.exit);
