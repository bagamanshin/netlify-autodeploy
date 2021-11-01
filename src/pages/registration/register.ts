import Handlebars from 'handlebars';

import Block from '../../utils/block';
import render from '../../utils/renderDOM';

import MainLayout from '../../layout/main/main';
import Input from '../../components/input/input';

import template from './register.tmpl';

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

const model = {
  login: '',
  email: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  repeat_password: ''
};

const regexLogin = /^(?=.{3,20}$)[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/;
const regexEmail = /^[a-zA-Z0-9_!#$%&'*+=?`{|}~^.-]+@[a-zA-Z]+\.[a-z]+$/;
const regexPassword = /^(?=.{8,20}$)(?=.*)(?=.*[A-Z])(?=.*[0-9]).*$/;
const regexPhone = /^[0-9+]\d{9,14}$/;
// const regexMessage = /^(?!\s*$).+$/;
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
  events: {
    input: (e) => {
      model.phone = e.target.value;
    },
    ...getValidationMixin(regexPhone, 'phone')
  }
});

const repeatPasswordInput = new Input({
  name: 'repeat_password',
  type: 'password',
  inputClassName: 'fieldset__input',
  events: {
    input: (e) => {
      model.repeat_password = e.target.value;
    },
    blur(e) {
      if (model.repeat_password !== model.password) {
        this.setProps({ errorMessage: 'Passwords dont match', value: e.target.value, ...!this.props.touched ? { touched: true } : {} });
        page
          .getContent()
          .querySelector('.fieldset--repeat_password')
          ?.classList.add('fieldset--error');
      } else {
        this.setProps({ errorMessage: '', value: e.target.value, ...!this.props.touched ? { touched: true } : {} });
        page
          .getContent()
          .querySelector('.fieldset--repeat_password')
          ?.classList.remove('fieldset--error');
      }
    }
  }
});

const passwordInput = new Input({
  name: 'password',
  type: 'password',
  inputClassName: 'fieldset__input',
  events: {
    input: (e) => {
      model.password = e.target.value;
    },
    ...getValidationMixin(regexPassword, 'password'),
    blur(e) {
      getValidationMixin(regexPassword, 'password').blur.call(this, e);
      if (repeatPasswordInput.props.touched) {
        repeatPasswordInput.setProps({ errorMessage: model.repeat_password !== model.password ? 'Passwords dont match' : '' });
        if (model.repeat_password !== model.password) {
          page
            .getContent()
            .querySelector('.fieldset--repeat_password')
            ?.classList.add('fieldset--error');
        } else {
          page
            .getContent()
            .querySelector('.fieldset--repeat_password')
            ?.classList.remove('fieldset--error');
        }
      }
    }
  }
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--email', emailInput);
render('.fieldset--login', loginInput);
render('.fieldset--first_name', firstNameInput);
render('.fieldset--second_name', secondNameInput);
render('.fieldset--phone', phoneInput);
render('.fieldset--password', passwordInput);
render('.fieldset--repeat_password', repeatPasswordInput);
