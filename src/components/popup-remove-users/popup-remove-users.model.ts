import { bus } from '../../modules';
import { regexNotEmpty } from '../../utils/validationRegex';

const data = {
  users: ''
};

type PopupRemoveUsersDataType = typeof data;

const validationMap = {
  users: regexNotEmpty
};

type ValidationMapType = typeof validationMap;

bus.on('popup-remove-users:set-field-data', (field: keyof PopupRemoveUsersDataType, value: string) => {
  data[field] = value;
});

bus.on('popup-remove-users:check-field', (field: keyof ValidationMapType) => {
  bus.emit(
    validationMap[field].test(data[field].trim()) ? 'popup-remove-users:valid-field' : 'popup-remove-users:invalid-field', field
  );
});

bus.on('popup-remove-users:check-form', () => {
  bus.emit('popup-remove-users:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof PopupRemoveUsersDataType) => {
    const validResult = validationMap[field].test(data[field].trim());
    setTimeout(() => bus.emit(validResult ? 'popup-remove-users:valid-field' : 'popup-remove-users:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    const users = data.users.trim().split(' ').map(Number);

    bus.emit('popup-remove-users:remove-users', users);
  }
});

export default data;
