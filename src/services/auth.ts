import { TValues } from 'components/form';

import { authAPI } from 'api/auth';
import notification from 'helpers/notification';

export const auth = async (
  values: TValues,
  url: string,
  message: string,
  description: string,
) => {
  try {
    const response = authAPI.auth(url, values);

    notification({ type: 'success', message, description });

    return response;
  } catch (error: any) {
    if (error.response) {
      notification({
        type: 'error',
        message: 'Ошибка',
        description: error.response.data.message,
      });
      console.log(error.response.data.message);
    } else if (error.request) {
      notification({
        type: 'error',
        message: 'Request',
        description: error.request,
      });
    } else {
      notification({
        type: 'error',
        message: 'Error',
        description: error.message,
      });
    }
  }
};
