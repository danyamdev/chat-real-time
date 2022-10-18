import { Socket } from 'socket.io-client';

export type TContext = {
  socket: Socket | null;
  setupSocket: () => Socket | null;
  user: { login: string; userId: string } | null
};

export const initialContext: TContext = {
  socket: null,
  setupSocket: () => null,
  user: null
};

export type TSocketContext = {
  socketContext: TContext;
  updateSocketContext: (updatedValues: Partial<TContext>) => void;
};