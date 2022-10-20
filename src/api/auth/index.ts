import axios from 'axios';

import { TValues } from 'types/form-values.type';

export const authAPI = {
  auth: async (url: string, data: TValues) =>
    await axios.post(`http://localhost:8000/api/auth/${url}`, data, {
      headers: { 'Content-Type': 'application/json' },
    }),
};
