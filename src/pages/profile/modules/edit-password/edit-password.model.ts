import userPasswordApi from '../../../../api/user-password-api';
import { bus } from '../../../../modules';

import { regexPassword } from '../../../../utils/validationRegex';

const data = {
  old_password: '',
  new_password: ''
};

type RegisterDataType = typeof data;

const validationMap = {
  old_password: regexPassword,
  new_password: regexPassword
};

type ValidationMapType = typeof validationMap;

bus.on('edit-password:set-field-data', (field: keyof RegisterDataType, value: string) => {
  data[field] = value;
});

function getValidationResult(field: keyof ValidationMapType): boolean {
  return validationMap[field].test(data[field]);
}

bus.on('edit-password:check-field', (field: keyof ValidationMapType) => {
  const validationResult = getValidationResult(field);

  bus.emit(validationResult ? 'edit-password:valid-field' : 'edit-password:invalid-field', field);
});

bus.on('edit-password:check-form', () => {
  bus.emit('edit-password:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof ValidationMapType) => {
    const validResult = getValidationResult(field);
    // for separating rendering DOM: render DOM-node without class, after that render with class
    setTimeout(() => bus.emit(validResult ? 'edit-password:valid-field' : 'edit-password:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    bus.emit('user:update-password-start');
    userPasswordApi.update({
      oldPassword: data.old_password,
      newPassword: data.new_password
    }).then((response) => {
      bus.emit('user:update-password-end', response.ok);
    });
  }
});

export default data;
