import { notification } from 'antd';

type TType = 'success' | 'info' | 'warning' | 'error';

type TNotification = {
  type: TType;
  message: string;
  description: string;
};

export default ({ type, message, description }: TNotification) => {
  notification[type]({ message, description });
};
