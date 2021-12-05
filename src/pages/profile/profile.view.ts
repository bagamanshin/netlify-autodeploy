import Handlebars from 'handlebars';

import './profile.scss';

import { Block, bus } from '../../modules';

import layout from '../../layout/profile';
import template from './profile.tmpl';

import ProfileController from './profile.controller';

import render from '../../utils/renderDOM';

export default class ProfilePage extends Block {
  constructor() {
    super('div', { className: 'card profile profile--view' });
  }

  render(): string {
    const compiledTemplate = Handlebars.compile(template);

    return compiledTemplate({});
  }

  componentDidMount() {
    bus.emit('user:fetch-user');
  }

  show() {
    Block.prototype.show.call(this);

    bus.emit('user:fetch-user');
  }

  renderDOM(rootQuery: string): void {
    layout.renderDOM(rootQuery);

    const profileController = new ProfileController();

    render('.profile-container', this);

    render(
      '.profile--view .fieldset--email',
      profileController.controls.inputs.email
    );
    render(
      '.profile--view .fieldset--login',
      profileController.controls.inputs.login
    );
    render(
      '.profile--view .fieldset--first_name',
      profileController.controls.inputs.first_name
    );
    render(
      '.profile--view .fieldset--second_name',
      profileController.controls.inputs.second_name
    );
    render(
      '.profile--view .fieldset--phone',
      profileController.controls.inputs.phone
    );
    render(
      '.profile--view .display_name',
      profileController.controls.inputs.display_name
    );

    render(
      '.profile--view .profile__avatar',
      profileController.controls.images.avatar
    );

    render(
      '.profile--view .actions',
      profileController.controls.links.goToEditPage
    );
    render(
      '.profile--view .actions',
      profileController.controls.links.goToEditPasswordPage
    );
    render('.profile--view .actions', profileController.controls.buttons.exit);
  }
}
