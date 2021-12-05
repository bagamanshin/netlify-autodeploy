import { UserResponse } from './UserResponse';

export type Chat = {
  // eslint-disable-next-line
  chat_id: number;
  avatar: string;
  title: string;
  // eslint-disable-next-line
  unread_count: number;
  // eslint-disable-next-line
  // created_by: number;
  // eslint-disable-next-line
  last_message: null | {
    user: UserResponse;
    time: string;
    content: string;
  };
};
