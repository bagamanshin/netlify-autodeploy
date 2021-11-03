import Handlebars from 'handlebars';

import MainLayout from '../../layout/main';
import Block from '../../modules/block';
import render from '../../utils/renderDOM';
import template from './404.tmpl';

export default class Page404 extends Block {
  constructor() {
    super('div', { className: 'page404-container' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

const layout = new MainLayout();
const page = new Page404();

render('body', layout);
render('.container.container--center', page);
