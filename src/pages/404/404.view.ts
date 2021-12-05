import Handlebars from 'handlebars';

import './404.scss';

import layout from '../../layout/main';

import { Block } from '../../modules';

import Page404Controller from './404.controller';

import template from './404.tmpl';

import render from '../../utils/renderDOM';

const page404Controller = new Page404Controller();

export default class Page404 extends Block {
  constructor() {
    super('div', { className: 'page404-container' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  renderDOM(rootQuery: string) {
    layout.renderDOM(rootQuery);
    render('.main-container', this);

    render('.page404-container .actions', page404Controller.controls.links.goToMainPage);
  }
}
