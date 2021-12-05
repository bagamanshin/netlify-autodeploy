import { bus } from '../../modules';

import { regexLogin, regexPassword } from '../../utils/validationRegex';

const data = {
  login: '',
  password: ''
};

type LoginDataType = typeof data;

const validationMap = {
  login: regexLogin,
  password: regexPassword
};

type ValidationMapType = typeof validationMap;

bus.on('login:set-field-data', (field: keyof LoginDataType, value: string) => {
  data[field] = value;
});

bus.on('login:check-field', (field: keyof ValidationMapType) => {
  bus.emit(
    validationMap[field].test(data[field]) ? 'login:valid-field' : 'login:invalid-field', field
  );
});

bus.on('login:check-form', () => {
  bus.emit('login:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof LoginDataType) => {
    const validResult = validationMap[field].test(data[field]);
    setTimeout(() => bus.emit(validResult ? 'login:valid-field' : 'login:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    bus.emit('login:signin', data);
  }
});
