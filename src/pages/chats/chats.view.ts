import Handlebars from 'handlebars';

import Block from '../../modules/block';
import render from '../../utils/renderDOM';

import ChatsLayout from '../../layout/chats';
import template from './chats.tmpl';

import Message from '../../components/message';
import ChatsController from './chats.controller';

export default class ChatsPage extends Block {
  constructor() {
    super('div', { className: 'chats-page' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new ChatsLayout();
const page = new ChatsPage();

const chatsController = new ChatsController();

const message1 = new Message({
  sender: 'not-you',
  content: 'Hello here!',
  date: '15:45'
});
const message2 = new Message({
  sender: 'you',
  content: 'Hi!',
  status: 'seen',
  date: '15:55'
});
const message3 = new Message({
  sender: 'you',
  content: 'How are you?',
  status: 'delivered',
  date: '16:05'
});
const message4 = new Message({
  sender: 'you',
  content: 'How is your doing?',
  status: 'sent',
  date: '16:15'
});

render('body', layout);
render('.container.chats-container', page);

render('.chatlist__head', chatsController.controls.inputs.search);

render('.chat-thread__messages', message1);
render('.chat-thread__messages', message2);
render('.chat-thread__messages', message3);
render('.chat-thread__messages', message4);

render('.chat-thread__actions', chatsController.controls.inputs.message);
render('.chat-thread__actions', chatsController.controls.buttons.sendMessage);
