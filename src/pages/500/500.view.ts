import Handlebars from 'handlebars';

import './500.scss';

import layout from '../../layout/main';

import { Block } from '../../modules';

import Page500Controller from './500.controller';

import template from './500.tmpl';

import render from '../../utils/renderDOM';

const page500Controller = new Page500Controller();

export default class Page500 extends Block {
  constructor() {
    super('div', { className: 'page500-container' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  renderDOM(rootQuery: string) {
    layout.renderDOM(rootQuery);
    render('.main-container', this);

    render('.page500-container .actions', page500Controller.controls.links.goToMainPage);
  }
}
