import Handlebars from 'handlebars';

import Block from '../../utils/block';
import render from '../../utils/renderDOM';

import ProfileLayout from '../../layout/profile/profile';
import Input from '../../components/input/input';

import template from './profile.tmpl';

const model = {
  login: 'Nickname',
  email: 'mail@mail.com',
  first_name: 'First',
  second_name: 'Second',
  phone: '88005553535',
  password: '123123123D'
};

export default class ProfilePage extends Block {
  constructor() {
    super('div', { className: 'card profile' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({ nickname: model.login });
  }
}

const layout = new ProfileLayout();
const page = new ProfilePage();

const loginInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'login',
  disabled: true,
  value: model.login
});

const emailInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'email',
  disabled: true,
  value: model.email
});

const firstNameInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'first_name',
  disabled: true,
  value: model.first_name
});

const secondNameInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'second_name',
  disabled: true,
  value: model.second_name
});

const phoneInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'phone',
  disabled: true,
  value: model.phone
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', emailInput);
render('.fieldset--login', loginInput);
render('.fieldset--first_name', firstNameInput);
render('.fieldset--second_name', secondNameInput);
render('.fieldset--phone', phoneInput);
