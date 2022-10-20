import { TUser } from 'types/user.type';

export type TMessage = {
  _id: string;
  chatroom: string;
  user: TUser;
  message: string;
  createdAt: string;
  updatedAt: string;
};