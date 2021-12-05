import authService from '../../modules/services/auth';

import { bus } from '../../modules';

import { UserResponse } from '../../types';

const data = {} as Omit<UserResponse, 'id' | 'avatar'>;

const avatarData = {} as { url: null | string; file: File | null };

function setupUserData(userData: UserResponse) {
  data.login = userData.login;
  data.email = userData.email;
  // eslint-disable-next-line
  data.first_name = userData.first_name;
  // eslint-disable-next-line
  data.second_name = userData.second_name;
  // eslint-disable-next-line
  data.display_name = userData.display_name;
  data.phone = userData.phone;

  avatarData.url = userData.avatar;
  avatarData.file = null;
}
setupUserData(authService.getCurrentUser());
bus.on('user:set-data', (userData: UserResponse) => {
  setupUserData(userData);
});

bus.on('edit:reset-models', () => {
  const user = authService.getCurrentUser();
  setupUserData(user);
  bus.emit('edit:setup-inputs', user);
});

export { data, avatarData };
