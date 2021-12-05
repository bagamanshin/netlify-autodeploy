import { Block, bus } from '../../modules';

import render from '../../utils/renderDOM';

export default abstract class Layout extends Block {
  constructor(tagName: string, props: Record<string, string>) {
    super(tagName, props);

    bus.on('routeHasChanged', () => {
      const someVisibleChild = Array
        .prototype
        .some.call(this.getContent().children, (child: HTMLElement) => !child.classList.contains('hidden') && !child.classList.contains('back'));
      if (!someVisibleChild) {
        this.getContent().classList.add('hidden');
      } else {
        this.getContent().classList.remove('hidden');
      }
    });
  }

  abstract render(): string;

  rendered = false;

  renderDOM(rootQuery: string) {
    if (!this.rendered) {
      render(rootQuery, this);
      this.rendered = true;
    }
  }
}
