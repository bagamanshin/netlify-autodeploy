import Handlebars from 'handlebars';

import template from './link.tmpl';

import './link.scss';
import { bus, Block } from '../../modules';
import { IBlockProps } from '../../modules/Block/types';

interface ILinkProps {
  text?: string;
  href: string;
}

const wrapClass = 'link';

export default class Link extends Block<HTMLAnchorElement, ILinkProps> {
  constructor(props: ILinkProps & Partial<IBlockProps & HTMLAnchorElement>) {
    super('a', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass,
      events: {
        ...(props.events ? props.events : {}),
        click(e: MouseEvent) {
          e.preventDefault();
          if (props.events?.click) props.events.click.call(this, e);
          if (this.props.href === '../') {
            bus.emit('navigateBack');
          } else {
            bus.emit('navigateTo', this.props.href);
          }
        }
      }
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);
    const { text = '', href = '' } = this.props;

    const wrapper = this.getContent();

    wrapper.dataset.href = href;

    return compiledTemplate({ text });
  }

  renderDOM = () => {}
}
