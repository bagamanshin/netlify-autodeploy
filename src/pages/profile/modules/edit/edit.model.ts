import bus from '../../../../modules/event-bus';

import {
  regexLogin,
  regexEmail,
  regexPhone,
  regexName
} from '../../../../utils/validationRegex';

const data = {
  login: 'Nickname',
  email: 'mail@mail.com',
  first_name: 'First',
  second_name: 'Second',
  phone: '88005553535'
};

type RegisterDataType = typeof data;

const validationMap = {
  login: regexLogin,
  email: regexEmail,
  phone: regexPhone,
  first_name: regexName,
  second_name: regexName
};

type ValidationMapType = typeof validationMap;

bus.on('edit:set-field-data', (field: keyof RegisterDataType, value: string) => {
  data[field] = value;
});

function getValidationResult(field: keyof ValidationMapType): boolean {
  return validationMap[field].test(data[field]);
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
    // for separating rendering DOM: render DOM-node without class, after that render with class
    setTimeout(() => bus.emit(validResult ? 'edit:valid-field' : 'edit:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    console.log('Form data:', data);
  }
});

export default data;
