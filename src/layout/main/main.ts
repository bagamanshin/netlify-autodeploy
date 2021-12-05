import Handlebars from 'handlebars';

import template from './main.tmpl';
import './main.scss';
import Layout from '../modules/layout';

class MainLayout extends Layout {
  constructor() {
    super('div', {
      className: 'container container--center main-container'
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}

export default new MainLayout();
