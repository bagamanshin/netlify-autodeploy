import bus from '../../modules/event-bus';

import { regexMessage } from '../../utils/validationRegex';

const data = {
  search: '',
  message: ''
};

type ChatsDataType = typeof data;

const validationMap = {
  message: regexMessage
};

type ValidationMapType = typeof validationMap;

bus.on('chats:set-field-data', (field: keyof ChatsDataType, value: string) => {
  data[field] = value;
});

bus.on('chats:check-field', (field: keyof ValidationMapType) => {
  bus.emit(
    validationMap[field].test(data[field]) ? 'chats:valid-field' : 'chats:invalid-field', field
  );
});

bus.on('chats:send-message', () => {
  if (validationMap.message.test(data.message)) {
    const { message } = data;
    console.log('Form data:', { message });
  } else {
    console.log('Message is invalid');
  }
});
