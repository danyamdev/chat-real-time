import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import { Avatar, Time } from 'components/index';
import { TUser } from 'types/user.type';

import './style.scss';

type TMessage = {
  user: TUser;
  message: string;
  id?: string;
  time: string;
};

const Message: React.FC<TMessage> = ({ user, message, time, id }) => (
  <div className={classNames('message', { 'message--isme': user._id === id })}>
    <div className="message__content">
      <Tooltip title={user.login}>
        <div className="message__avatar">
          <Avatar user={user} />
        </div>
      </Tooltip>
      <div className="message__info">
        <div className="message__bubble">
          <p className="message__text">{message}</p>
        </div>

        <span className="message__date">
          <Time date={time} />
        </span>
      </div>
    </div>
  </div>
);

export default Message;
