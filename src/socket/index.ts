import { io } from 'socket.io-client';

export const installSocket = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const socket = io('http://localhost:8000', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socket.on('connect', () => {
      console.log('connect')
    });

    socket.on('disconnect', () => {
      console.log('disconnect')
    });

  return socket;
  }

  return null;
};