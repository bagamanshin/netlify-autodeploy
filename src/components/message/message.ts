import Handlebars from 'handlebars';

import Block, { IBlockProps } from '../../modules/block';
import template from './message.tmpl';

Handlebars.registerHelper('equals', function (string1, string2, options) {
  if (string1 === string2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

interface IMessageProps {
  sender: 'you' | 'not-you';
  status?: 'sent' | 'delivered' | 'seen';
  content: string;
  date: string;
}

export default class Message extends Block<HTMLDivElement, IMessageProps> {
  constructor(props: IMessageProps & Partial<IBlockProps>) {
    super('div', {
      ...props,
      className: `chat-thread__message chat-thread__message--${props.sender} chat-thread__message--${props.status}`
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const { content, date, sender } = this.props;

    return compiledTemplate({ content, date, sender });
  }
}
