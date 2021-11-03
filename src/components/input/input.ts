import Handlebars from 'handlebars';

import Block, { IBlockProps } from '../../modules/block';
import template from './input.tmpl';
import './input.scss';

interface IInputProps{
  inputClassName?: string;
  errorMessage?: string;
  touched?: boolean;
}

export default class Input extends Block<HTMLInputElement, IInputProps> {
  constructor(props: IInputProps & Partial<HTMLInputElement & IBlockProps>) {
    const wrapClass = 'input-component-wrap';
    super('span', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass,
      touched: false,
      value: props.value || '',
      events: {
        ...(props.events ? props.events : {}),
        blur(e: InputEvent) {
          if (props.events?.blur) props.events.blur.call(this, e);
          if (!this.props.touched) {
            this.setProps({ touched: true });
          }
        }
      }
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    const {
      inputClassName = '',
      type = '',
      value = '',
      placeholder = '',
      disabled = false,
      errorMessage = ''
    } = this.props;

    return compiledTemplate({
      inputClassName,
      type,
      value,
      placeholder,
      disabled,
      errorMessage
    });
  }
}
