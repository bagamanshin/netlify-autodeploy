import Handlebars from 'handlebars';

import LayoutTmpl from '../../layout/chats/chats.tmpl';
import ChatsTmpl from './chats.tmpl';
import InputComponentTmpl from '../../components/input/input.tmpl';
import registerInputPartials from '../../utils/registerInputPartials';

const InputComponentTemplate = Handlebars.compile(InputComponentTmpl);
const inputsMap = {
  searchInput: {
    name: 'search',
    placeholder: 'Search',
    className: 'chatlist__head__input',
  },
};

registerInputPartials(inputsMap, InputComponentTemplate);

const MainTemplate = Handlebars.compile(ChatsTmpl);
const LayoutTemplate = Handlebars.compile(LayoutTmpl);

Handlebars.registerPartial('pageContent', MainTemplate({}));

document.body.insertAdjacentHTML('afterbegin', LayoutTemplate({}));

Handlebars.unregisterPartial('pageContent');
