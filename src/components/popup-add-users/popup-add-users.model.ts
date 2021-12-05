import { bus } from '../../modules';
import { regexNotEmpty } from '../../utils/validationRegex';

const data = {
  users: ''
};

type PopupAddUsersDataType = typeof data;

const validationMap = {
  users: regexNotEmpty
};

type ValidationMapType = typeof validationMap;

bus.on('popup-add-users:set-field-data', (field: keyof PopupAddUsersDataType, value: string) => {
  data[field] = value;
});

bus.on('popup-add-users:check-field', (field: keyof ValidationMapType) => {
  bus.emit(
    validationMap[field].test(data[field].trim()) ? 'popup-add-users:valid-field' : 'popup-add-users:invalid-field', field
  );
});

bus.on('popup-add-users:check-form', () => {
  bus.emit('popup-add-users:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof PopupAddUsersDataType) => {
    const validResult = validationMap[field].test(data[field].trim());
    setTimeout(() => bus.emit(validResult ? 'popup-add-users:valid-field' : 'popup-add-users:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    const users = data.users.trim().split(' ').map(Number);

    bus.emit('popup-add-users:add-users', users);
  }
});

export default data;
