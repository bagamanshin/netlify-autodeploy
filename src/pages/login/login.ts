import Handlebars from 'handlebars';

import Block from '../../utils/block';
import render from '../../utils/renderDOM';

import MainLayout from '../../layout/main/main';
import Input from '../../components/input/input';

import template from './login.tmpl';

export default class LoginPage extends Block {
  constructor() {
    super('div', { className: 'login' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new MainLayout();
const page = new LoginPage();

const model = {
  login: '',
  password: ''
};

const regexLogin = /^(?=.{3,20}$)[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/;
const regexPassword = /^(?=.{8,20}$)(?=.*)(?=.*[A-Z])(?=.*[0-9]).*$/;

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

const passwordInput = new Input({
  name: 'password',
  type: 'password',
  inputClassName: 'fieldset__input',
  events: {
    input: (e) => {
      model.password = e.target.value;
    },
    ...getValidationMixin(regexPassword, 'password')
  }
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--login', loginInput);
render('.fieldset--password', passwordInput);
