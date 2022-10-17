import { Socket } from 'socket.io-client';

export type TContext = {
  socket: Socket | null;
  setupSocket: () => Socket | null;
};

export const initialContext: TContext = {
  socket: null,
  setupSocket: () => null,
};

export type TSocketContext = {
  socketContext: TContext;
  updateSocketContext: (updatedValues: Partial<TContext>) => void;
};