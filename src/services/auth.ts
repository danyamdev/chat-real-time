import axios from 'axios';

import { Notification } from 'components/index';

import { TValues } from 'components/form';

export const auth = async (
  values: TValues,
  url: string,
  message: string,
  description: string,
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/auth/${url}`,
      values,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    Notification({ type: 'success', message, description });

    return response;
  } catch (error: any) {
    if (error.response) {
      Notification({
        type: 'error',
        message: 'Ошибка',
        description: error.response.data.message,
      });
      console.log(error.response.data.message);
    } else if (error.request) {
      Notification({
        type: 'error',
        message: 'Request',
        description: error.request,
      });
    } else {
      Notification({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
  }
};
