import Handlebars from 'handlebars';

import './chats.scss';

import { Block, bus } from '../../modules';

import layout from '../../layout/chats';
import template from './chats.tmpl';

import ChatsController from './chats.controller';

import render from '../../utils/renderDOM';

const chatsController = new ChatsController();

export default class ChatsPage extends Block {
  constructor() {
    super('div', { className: 'chats-page' });
  }

  componentDidMount() {
    bus.emit('chats:fetch-chats');
  }

  show() {
    Block.prototype.show.call(this);
    bus.emit('chats:fetch-chats');
  }

  hide() {
    Block.prototype.hide.call(this);
    bus.emit('chats:reset-selected-chat');
    bus.emit('chats:reset-chats');
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  renderDOM(rootQuery: string): void {
    layout.renderDOM(rootQuery);

    render('.container.chats-container', this);

    render('.chatlist__head', chatsController.controls.inputs.search);

    render('.chatlist__items__wrap', chatsController.components.chats);
    render('.chats-page', chatsController.components.chatWindow);

    render('.chats-page', chatsController.components.popups['create-chat']);
    render('.chats-page', chatsController.components.popups['add-users']);
    render('.chats-page', chatsController.components.popups['remove-users']);

    render(
      '.chatlist__head__text',
      chatsController.controls.links.goToProfilePage
    );
  }
}
