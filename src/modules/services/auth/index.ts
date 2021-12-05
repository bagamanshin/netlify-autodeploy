import { UserResponse } from '../../../types/UserResponse';
import { Roles } from '../../../enums';

import { bus } from '../..';

import userApi from '../../../api/user-api';

import cloneDeep from '../../../utils/cloneDeep';

const emptyUserData: UserResponse = {
  avatar: '',
  display_name: '',
  email: '',
  first_name: '',
  id: NaN,
  login: '',
  phone: '',
  second_name: ''
};

class AuthService {
  private currentUser: UserResponse = { ...emptyUserData };

  private authRole: Roles = Roles.guest;

  constructor() {
    bus.on('user:fetch-user', this.fetchUser);

    bus.on('user:logged', (status: boolean) => {
      this.authRole = Roles[status ? 'user' : 'guest'];

      if (!status) {
        bus.emit('user:set-data', { ...emptyUserData });
      }
    });

    bus.on('user:set-data', (data: UserResponse) => {
      this.currentUser = { ...data };
    });
  }

  fetchUser = () => userApi.request().then((response) => {
    if (response.ok) {
      const user = response.json<UserResponse>();
      bus.emit('user:set-data', user);
      bus.emit('user:logged', true);
    }
    return this.currentUser;
  });

  getCurrentUser = () => cloneDeep(this.currentUser);

  getCurrentRole = () => this.authRole;

  get getCurrentUserId() {
    return this.currentUser.id;
  }
}

export default new AuthService();
