import { bffAxios } from 'api/index';

export const messagesAPI = {
  getAll: (id: string) => bffAxios.get(`/message/${id}`),
};
