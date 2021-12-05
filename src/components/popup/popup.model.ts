import { bus } from '../../modules';
import { regexNotEmpty } from '../../utils/validationRegex';

const data = {
  title: ''
};

type PopupCreateChatDataType = typeof data;

const validationMap = {
  title: regexNotEmpty
};

type ValidationMapType = typeof validationMap;

bus.on('popup-create-chat:set-field-data', (field: keyof PopupCreateChatDataType, value: string) => {
  data[field] = value;
});

bus.on('popup-create-chat:check-field', (field: keyof ValidationMapType) => {
  bus.emit(
    validationMap[field].test(data[field]) ? 'popup-create-chat:valid-field' : 'popup-create-chat:invalid-field', field
  );
});

bus.on('popup-create-chat:check-form', () => {
  bus.emit('popup-create-chat:reset-check-results');

  const validationResults: boolean[] = [];

  Object.keys(data).forEach((field: keyof PopupCreateChatDataType) => {
    const validResult = validationMap[field].test(data[field]);
    setTimeout(() => bus.emit(validResult ? 'popup-create-chat:valid-field' : 'popup-create-chat:invalid-field', field));
    validationResults.push(validResult);
  });

  if (validationResults.every((i: boolean) => i)) {
    bus.emit('popup-create-chat:create-chat', { title: data.title });
  }
});

export default data;
