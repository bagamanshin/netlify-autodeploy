import { bus } from '../../../../modules';

import {
  regexLogin,
  regexEmail,
  regexPhone,
  regexName
} from '../../../../utils/validationRegex';

import authService from '../../../../modules/services/auth';

import { UserResponse } from '../../../../types/UserResponse';
import isEqual from '../../../../utils/isEqual';
import userAvatarApi from '../../../../api/user-avatar-api';
import userProfileApi from '../../../../api/user-profile-api';

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

bus.on('edit:set-avatar', (file: File | null) => {
  avatarData.file = file;

  if (!file) {
    avatarData.url = null;
  } else {
    const imageObjectURL = URL.createObjectURL(file);
    avatarData.url = imageObjectURL;
  }

  bus.emit('user:avatar-locally-updated', avatarData.file);
});

type ProfileDataType = typeof data;

const validationMap = {
  login: regexLogin,
  email: regexEmail,
  phone: regexPhone,
  first_name: regexName,
  second_name: regexName
};

type ValidationMapType = typeof validationMap;

bus.on('edit:set-field-data', (field: keyof ProfileDataType, value: string) => {
  data[field] = value;
});

function getValidationResult(field: keyof ValidationMapType): boolean {
  return validationMap[field] ? validationMap[field].test(data[field]) : true;
}

bus.on('edit:check-field', (field: keyof ValidationMapType) => {
  const validationResult = getValidationResult(field);

  bus.emit(validationResult ? 'edit:valid-field' : 'edit:invalid-field', field);
});

bus.on('edit:check-form', () => {
  bus.emit('edit:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof ValidationMapType) => {
    const validResult = getValidationResult(field);
    // for separating rendering DOM: render DOM-node without class, after that, render with class
    setTimeout(() => {
      bus.emit(validResult ? 'edit:valid-field' : 'edit:invalid-field', field);
    });
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    const prevUser = authService.getCurrentUser();

    delete prevUser.id;
    delete prevUser.avatar;

    const createUpdateAvatarPromise = () => new Promise((resolve) => {
      if (avatarData.file) {
        const fd = new FormData();
        fd.append('avatar', avatarData.file);
        resolve(userAvatarApi.update(fd));
      }
      resolve(true);
    });

    const createUpdateProfilePromise = () => new Promise((resolve) => {
      if (!isEqual(data, prevUser)) {
        resolve(userProfileApi.update(data));
      }
      resolve(true);
    });

    bus.emit('user:update-profile-start');

    Promise.all([createUpdateProfilePromise(), createUpdateAvatarPromise()]).then(() => {
      bus.emit('user:update-profile-end');
      bus.emit('user:fetch-user');
    });
  }
});

export { data, avatarData };
