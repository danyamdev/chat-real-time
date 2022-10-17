import axios from 'axios';

export const authAPI = {
  auth: async (url: string, data: any) =>
    await axios.post(`http://localhost:8000/api/auth/${url}`, data, {
      headers: { 'Content-Type': 'application/json' },
    }),
};
