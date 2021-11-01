import Handlebars from 'handlebars';

import Block from '../../utils/block';
import template from './button.tmpl';

export default class Button extends Block<
  HTMLButtonElement & { errorMessage?: string }
> {
  constructor(props: HTMLButtonElement) {
    const wrapClass = 'button';
    super('span', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);
    const { text = '', disabled = false } = this.props;

    const wrapper = this.getContent();
    wrapper.disabled = disabled;

    return compiledTemplate({ text });
  }
}
