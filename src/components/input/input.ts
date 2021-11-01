import Handlebars from 'handlebars';

import Block from '../../utils/block';
import template from './input.tmpl';
import './input.scss';

type InputType = HTMLInputElement & {
  inputClassName?: string;
  errorMessage?: string;
};

export default class Input extends Block<InputType> {
  constructor(props) {
    const wrapClass = 'input-component-wrap';
    super('span', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass,
      touched: false
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const {
      text = '',
      inputClassName = '',
      type = '',
      value = '',
      placeholder = '',
      disabled = false,
      errorMessage = ''
    } = this.props;

    return compiledTemplate({
      text,
      inputClassName,
      type,
      value,
      placeholder,
      disabled,
      errorMessage
    });
  }
}
