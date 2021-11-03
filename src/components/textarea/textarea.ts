import Handlebars from 'handlebars';

import Block from '../../modules/block';
import template from './textarea.tmpl';
import './textarea.scss';

export default class Textarea extends Block {
  constructor(props) {
    super('div', {
      ...props,
      className: 'chat-thread__actions__input',
      value: props.value || ''
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}
