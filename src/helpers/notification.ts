import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type TNotification = {
  type: NotificationType;
  message: string;
  description: string;
};

export default ({ type, message, description }: TNotification) => {
  notification[type]({ message, description });
};
