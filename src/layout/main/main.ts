import Handlebars from 'handlebars';

import Block from '../../utils/block';
import template from './main.tmpl';
import './main.scss';

export default class MainLayout extends Block {
  constructor() {
    super('div', {
      className: 'container container--center'
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}
