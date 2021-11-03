import Handlebars from 'handlebars';

import Block from '../../modules/block';
import template from './chats.tmpl';
import './chats.scss';

export default class ChatsLayout extends Block {
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
