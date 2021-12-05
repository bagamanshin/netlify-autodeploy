import Handlebars from 'handlebars';

import { MessageAuthorIdentity } from '../../enums';

import { Block } from '../../modules';
import template from './message.tmpl';

import { IBlockProps } from '../../modules/Block/types';

Handlebars.registerHelper('isYou', function (string1, options) {
  if (string1 === MessageAuthorIdentity.you) {
    return options.fn(this);
  }
  return options.inverse(this);
});

interface IMessageProps {
  senderIdentity: MessageAuthorIdentity;
  sender: string;
  status?: 'sent' | 'delivered' | 'seen';
  content: string;
  date: string;
}

export default class Message extends Block<HTMLDivElement, IMessageProps> {
  constructor(props: IMessageProps & Partial<IBlockProps>) {
    super('div', {
      ...props,
      className: `chat-thread__message chat-thread__message--${props.senderIdentity} chat-thread__message--${props.status}`
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const {
      content, date, senderIdentity, sender
    } = this.props;

    return compiledTemplate({
      content, date, senderIdentity, sender
    });
  }
}
