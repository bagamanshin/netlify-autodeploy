import Handlebars from 'handlebars';

import MainLayout from '../../layout/main';
import Block from '../../modules/block';
import render from '../../utils/renderDOM';
import template from './500.tmpl';

export default class Page500 extends Block {
  constructor() {
    super('div', { className: 'page500-container' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new MainLayout();
const page = new Page500();

render('body', layout);
render('.container.container--center', page);
