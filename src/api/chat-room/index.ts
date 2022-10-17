import { bffAxios } from 'api/index';

export const chatRoomAPI = {
  getAll: () => bffAxios.get('/chat-room/'),
  getById: (id: string) => bffAxios.get(`/chat-room/${id}`),
  postChatRoom: (value: any) => bffAxios.post('/chat-room/create', value),
  deleteChatRoom: (id: string) => bffAxios.delete(`/chat-room/${id}`),
};
