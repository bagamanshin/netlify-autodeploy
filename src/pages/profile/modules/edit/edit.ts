import Handlebars from 'handlebars';

import Block from '../../../../utils/block';
import render from '../../../../utils/renderDOM';

import ProfileLayout from '../../../../layout/profile/profile';
import Input from '../../../../components/input/input';

import template from './edit.tmpl';

const model = {
  login: 'Nickname',
  email: 'mail@mail.com',
  first_name: 'First',
  second_name: 'Second',
  phone: '88005553535',
  password: '123123123D'
};

export default class ProfileEditPasswordPage extends Block {
  constructor() {
    super('div', { className: 'card profile' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({ nickname: model.login });
  }
}

const layout = new ProfileLayout();
const page = new ProfileEditPasswordPage();

const regexLogin = /^(?=.{3,20}$)[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/;
const regexEmail = /^[a-zA-Z0-9_!#$%&'*+=?`{|}~^.-]+@[a-zA-Z]+\.[a-z]+$/;
const regexPhone = /^[0-9+]\d{9,14}$/;
const regexName = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/;

const getValidationMixin = (regex, modifier) => ({
  blur(e) {
    if (!regex.test(e.target.value)) {
      this.setProps({ errorMessage: `Incorrect ${modifier}`, value: e.target.value, ...!this.props.touched ? { touched: true } : {} });
      page
        .getContent()
        .querySelector(`.fieldset--${modifier}`)
        ?.classList.add('fieldset--error');
    } else {
      this.setProps({ errorMessage: '', value: e.target.value, ...!this.props.touched ? { touched: true } : {} });
      page
        .getContent()
        .querySelector(`.fieldset--${modifier}`)
        ?.classList.remove('fieldset--error');
    }
  }
});

const loginInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'login',
  value: model.login,
  events: {
    input: (e) => {
      model.login = e.target.value;
    },
    ...getValidationMixin(regexLogin, 'login')
  }
});

const emailInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'email',
  value: model.email,
  events: {
    input: (e) => {
      model.email = e.target.value;
    },
    ...getValidationMixin(regexEmail, 'email')
  }
});

const firstNameInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'first_name',
  value: model.first_name,
  events: {
    input: (e) => {
      model.first_name = e.target.value;
    },
    ...getValidationMixin(regexName, 'first_name')
  }
});

const secondNameInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'second_name',
  value: model.second_name,
  events: {
    input: (e) => {
      model.second_name = e.target.value;
    },
    ...getValidationMixin(regexName, 'second_name')
  }
});

const phoneInput = new Input({
  inputClassName: 'fieldset__input',
  name: 'phone',
  value: model.phone,
  events: {
    input: (e) => {
      model.phone = e.target.value;
    },
    ...getValidationMixin(regexPhone, 'phone')
  }
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', emailInput);
render('.fieldset--login', loginInput);
render('.fieldset--first_name', firstNameInput);
render('.fieldset--second_name', secondNameInput);
render('.fieldset--phone', phoneInput);
