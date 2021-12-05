import Handlebars from 'handlebars';

import { Block } from '../../modules';
import template from './chat-item.tmpl';

import Image from '../image';

import './chat-item.scss';

import { MessageAuthorIdentity } from '../../enums';
import { Chat } from '../../types';
import { IBlockProps } from '../../modules/Block/types';

import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

Handlebars.registerHelper('biggerThan', function (string1, string2, options) {
  if (string1 > string2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('notFalsy', function (string1, options) {
  if (string1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

type IChatItemProps = Chat & {
  active: boolean;
  lastMessageSender: MessageAuthorIdentity;
};

const wrapClass = 'chatlist__item';

// eslint-disable-next-line
const wrapActiveClass = 'chatlist__item--active';

export default class ChatItem extends Block<HTMLDivElement, IChatItemProps> {
  constructor(props: IChatItemProps & Partial<IBlockProps>) {
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const {
      avatar = '',
      title,
      // eslint-disable-next-line
      unread_count,
      // eslint-disable-next-line
      last_message,
      active
    } = this.props;

    let author;
    let content;
    let date;

    // eslint-disable-next-line
    if (!last_message) {
      author = '';
      content = '';
      date = '';
    } else {
      author = this.props.lastMessageSender === MessageAuthorIdentity.you
        ? capitalizeFirstLetter(MessageAuthorIdentity.you) : last_message.user.display_name;
      content = last_message.content;

      const dt = new Date(last_message.time);

      date = `
        ${(`0${dt.getDate()}`).slice(-2)}.${(`0${dt.getMonth() + 1}`).slice(-2)}.${dt.getFullYear()}
        ${(`0${dt.getHours()}`).slice(-2)}:${(`0${dt.getMinutes()}`).slice(-2)}:${(`0${dt.getSeconds()}`).slice(-2)}`;
    }

    // return compiledTemplate({
    //   avatar,
    //   title,
    //   unread_count,
    //   date,
    //   author,
    //   content
    // });

    const wrap = document.createElement('div');
    wrap.innerHTML = compiledTemplate({
      title,
      unread_count,
      date,
      author,
      content,
      lastMessageSender: this.props.lastMessageSender
    });

    wrap.classList.add('chatlist__item__inner');

    const avatarInstance = new Image({
      imageData: avatar,
      imgClass: 'chatlist__item__avatar__image',
      className: 'chatlist__item__avatar__box'
    });
    wrap
      .querySelector('.chatlist__item__avatar')
      ?.append(avatarInstance.getContent());

    const rootEl = this.getContent();

    if (active && !rootEl.classList.contains(wrapActiveClass)) {
      rootEl.classList.add(wrapActiveClass);
    } else if (!active && rootEl.classList.contains(wrapActiveClass)) {
      rootEl.classList.remove(wrapActiveClass);
    }

    return wrap;
  }
}
