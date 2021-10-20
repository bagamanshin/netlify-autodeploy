import Handlebars from 'handlebars';

import LayoutTmpl from '../../../../layout/profile/profile.tmpl';
import EditTmpl from './edit-password.tmpl';
import InputComponentTmpl from '../../../../components/input/input.tmpl';

import registerInputPartials from '../../../../utils/registerInputPartials';

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);

const inputsMap = {
  oldPassword: {
    name: 'oldPassword',
    type: 'password',
    className: 'fieldset__input',
  },
  newPassword: {
    name: 'newPassword',
    type: 'password',
    className: 'fieldset__input',
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const EditTemplate = Handlebars.compile(EditTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial('pageContent', EditTemplate({}));

document.body.insertAdjacentHTML('afterbegin', LayoutTemplate({}));
