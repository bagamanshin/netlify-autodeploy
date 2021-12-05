import { bus } from '../../modules';

const data = {
  search: ''
};

type ChatsPageDataType = typeof data;

bus.on('chats:set-field-data', (field: keyof ChatsPageDataType, value: string) => {
  data[field] = value;
});

export default data;
