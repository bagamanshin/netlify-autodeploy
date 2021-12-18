import { Router, Notifications } from '../modules';

import LoginPage from './login';
import RegisterPage from './registration';
import ProfilePage from './profile';
import ChatsPage from './chats';
import Page404 from './404';
import Page500 from './500';
import ProfileEditPage from './profile/modules/edit';
import ProfileEditPasswordPage from './profile/modules/edit-password';

import authService from '../modules/services/auth';

import { Roles } from '../enums';

authService.fetchUser().then(() => {
  const routerInstance = new Router('body');

  routerInstance
    .use('/', LoginPage, { permissions: [Roles.guest] })
    .use('/sign-up', RegisterPage, { permissions: [Roles.guest] })
    .use('/settings', ProfilePage, { permissions: [Roles.user] })
    .use('/settings/edit', ProfileEditPage, { permissions: [Roles.user] })
    .use('/settings/edit-password', ProfileEditPasswordPage, { permissions: [Roles.user] })
    .use('/messenger', ChatsPage, { permissions: [Roles.user] })
    .use('/404', Page404, { permissions: [Roles.user, Roles.guest] })
    .use('/500', Page500, { permissions: [Roles.user, Roles.guest] })
    .start();

  (new Notifications()).init();
});
