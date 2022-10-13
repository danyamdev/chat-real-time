import React from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type TNotification = {
  type: NotificationType;
  message: string;
  description: string;
};

const Notification = ({ type, message, description }: TNotification) => {
  notification[type]({ message, description });
};

export default Notification;
