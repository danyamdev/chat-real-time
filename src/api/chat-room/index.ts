import { bffAxios } from 'api/index';

export const chatRoomAPI = {
  getAll: () => bffAxios.get('/chat-room/'),

  getById: (id: string) => bffAxios.get(`/chat-room/${id}`),

  postChatRoom: (values: { name: string, userId: string }) => bffAxios.post('/chat-room/create', values),

  deleteChatRoom: (id: string) => bffAxios.delete(`/chat-room/${id}`),
};
