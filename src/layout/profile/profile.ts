import Handlebars from 'handlebars';

import Block from '../../utils/block';
import template from './profile.tmpl';
import './profile.scss';

export default class MainLayout extends Block {
  constructor() {
    super('div', {
      className: 'container container--center profile-container'
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }
}
