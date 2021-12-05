import { Block } from '../../modules';

import { IBlockProps } from '../../modules/Block/types';

import './textarea.scss';

interface ITextAreaProps{
  value: string;
  placeholder: string
}

export default class Textarea extends Block<HTMLTextAreaElement, ITextAreaProps> {
  constructor(props: ITextAreaProps & Partial<HTMLTextAreaElement & IBlockProps>) {
    const wrapClass = 'chat-thread__actions__input';
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass,
      placeholder: props.placeholder || ''
    });
  }

  render() {
    const textAreaElement = document.createElement('textarea');
    textAreaElement.placeholder = this.props.placeholder!;
    textAreaElement.rows = 2;
    textAreaElement.value = this.props.value || '';

    return textAreaElement;
  }
}
