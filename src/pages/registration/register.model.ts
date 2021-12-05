import { bus } from '../../modules';

import {
  regexLogin,
  regexPassword,
  regexEmail,
  regexPhone,
  regexName
} from '../../utils/validationRegex';

const data = {
  login: '',
  email: '',
  phone: '',
  first_name: '',
  second_name: '',
  password: '',
  repeat_password: ''
};

type RegisterDataType = typeof data;

const validationMap = {
  login: regexLogin,
  email: regexEmail,
  phone: regexPhone,
  first_name: regexName,
  second_name: regexName,
  password: regexPassword,
  repeat_password: (): boolean => data.password === data.repeat_password
};

type ValidationMapType = typeof validationMap;

bus.on('register:set-field-data', (field: keyof RegisterDataType, value: string) => {
  data[field] = value;
});

function getValidationResult(field: keyof ValidationMapType): boolean {
  let validationResult: boolean;

  if (validationMap[field] instanceof RegExp) {
    validationResult = (validationMap[field] as RegExp).test(data[field]);
  } else if (validationMap[field] instanceof Function) {
    validationResult = (validationMap[field] as Function)();
  } else {
    validationResult = false;
  }
  return validationResult;
}

bus.on('register:check-field', (field: keyof ValidationMapType) => {
  const validationResult = getValidationResult(field);

  bus.emit(validationResult ? 'register:valid-field' : 'register:invalid-field', field);
});

bus.on('register:check-form', () => {
  bus.emit('register:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof ValidationMapType) => {
    const validResult = getValidationResult(field);
    // for separating rendering DOM: render DOM-node without class, after that render with class
    setTimeout(() => bus.emit(validResult ? 'register:valid-field' : 'register:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    bus.emit('register:create', {
      first_name: data.first_name,
      second_name: data.second_name,
      login: data.login,
      email: data.email,
      password: data.password,
      phone: data.phone
    });
  }
});
