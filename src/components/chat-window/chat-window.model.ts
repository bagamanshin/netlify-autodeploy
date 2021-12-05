import { bus } from '../../modules';

import { regexNotEmpty } from '../../utils/validationRegex';

const dt = new Date();

const data = {
  currentDate: `${(`0${dt.getDate()}`).slice(-2)}.${(`0${dt.getMonth() + 1}`).slice(-2)}.${dt.getFullYear()}`,
  message: ''
};

type ChatsDataType = typeof data;

const validationMap = {
  message: regexNotEmpty
};

bus.on('chat-window:set-field-data', (field: keyof ChatsDataType, value: string) => {
  data[field as 'message'] = value;
});

bus.on('chat-window:send-message', () => {
  if (validationMap.message.test(data.message)) {
    const { message } = data;
    bus.emit('chat-window:ready-to-send-message', message);
    bus.emit('chat-window:clear-message-input');
  } else {
    console.log('Message is invalid');
  }
});

bus.on('chat-window:clear-message-input', () => {
  data.message = '';
});

export default data;
