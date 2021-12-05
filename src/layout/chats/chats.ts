import Handlebars from 'handlebars';

import template from './chats.tmpl';
import './chats.scss';

import Layout from '../modules/layout';

class ChatsLayout extends Layout {
  constructor() {
    super('div', {
      className: 'container chats-container'
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

export default new ChatsLayout();
