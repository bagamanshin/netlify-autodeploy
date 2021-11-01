import Handlebars from 'handlebars';

import Block from '../../../../utils/block';
import render from '../../../../utils/renderDOM';

import ProfileLayout from '../../../../layout/profile/profile';
import Input from '../../../../components/input/input';

import template from './edit-password.tmpl';

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

const model = {
  oldPassword: '',
  newPassword: ''
};

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

const newPasswordInput = new Input({
  name: 'repeat_password',
  type: 'password',
  inputClassName: 'fieldset__input',
  events: {
    input: (e) => {
      model.newPassword = e.target.value;
    },
    ...getValidationMixin(regexPassword, 'new_password')
  }
});

const oldPasswordInput = new Input({
  name: 'password',
  type: 'password',
  inputClassName: 'fieldset__input',
  events: {
    input: (e) => {
      model.oldPassword = e.target.value;
    },
    ...getValidationMixin(regexPassword, 'old_password')
  }
});

render('body', layout);
render('.container.container--center', page);

render('.fieldset--old_password', oldPasswordInput);
render('.fieldset--new_password', newPasswordInput);
