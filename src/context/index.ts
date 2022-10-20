import { Socket } from 'socket.io-client';

import { TUserToken } from 'types/user.type';

export type TContext = {
  socket: Socket | null;
  setupSocket: () => Socket | null;
  user: TUserToken | null;
};

export const initialContext: TContext = {
  socket: null,
  setupSocket: () => null,
  user: null,
};

export type TSocketContext = {
  socketContext: TContext;
  updateSocketContext: (updatedValues: Partial<TContext>) => void;
};
