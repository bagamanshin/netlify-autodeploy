import { Block, bus } from '../../modules';

import { IBlockProps } from '../../modules/Block/types';

import './tooltip.scss';

interface ITooltipProps {
  items: Record<string, (this: HTMLDivElement, ev: MouseEvent) => any>;
}

export default class Tooltip extends Block<HTMLDivElement, ITooltipProps> {
  constructor(props: ITooltipProps & Partial<IBlockProps & HTMLDivElement>) {
    const wrapClass = 'tooltip';
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });

    this.hide();

    bus.on('tooltip:show', () => {
      this.show();
    });
    bus.on('tooltip:hide', () => {
      this.hide();
    });
  }

  render() {
    const inner = document.createElement('div');
    inner.classList.add('tooltip__inner');

    const { items = {} } = this.props;

    Object.keys(items).forEach(
      (itemCapture: string) => {
        const div = document.createElement('div');
        div.classList.add('tooltip__inner__item');
        div.textContent = itemCapture;
        div.addEventListener('click', items[itemCapture]);
        inner.append(div);
      }
    );

    return inner;
  }
}
