import Handlebars from 'handlebars';

import template from './profile.tmpl';
import './profile.scss';
import Layout from '../modules/layout';
import ProfileLayoutController from './profile.controller';
import render from '../../utils/renderDOM';

const profileLayoutController = new ProfileLayoutController();

class ProfileLayout extends Layout {
  constructor() {
    super('div', {
      className: 'container container--center profile-container'
    });
  }

  render() {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  renderDOM(rootQuery: string) {
    Layout.prototype.renderDOM.call(this, rootQuery);

    render('.profile-container .back', profileLayoutController.controls.links.goBack);
  }
}

export default new ProfileLayout();
