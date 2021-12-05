import { UserResponse } from './UserResponse';

export type ChatResponse = {
  id: number;
  title: string;
  avatar: string;
  // eslint-disable-next-line
  unread_count: number;
  // eslint-disable-next-line
  last_message: null | {
    user: UserResponse;
    time: string;
    content: string;
  };
};
