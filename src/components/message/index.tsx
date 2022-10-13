import React from 'react';
import classNames from 'classnames';

import { Avatar, Time } from 'components/index';

import './style.scss';

type TMessage = {
  user: any;
  date: string;
  isMe: boolean;
};

const Message: React.FC<TMessage> = ({ user, date, isMe }) => (
  <div className={classNames('message', { 'message--isme': isMe })}>
    <div className="message__content">
      <div className="message__avatar">
        <Avatar user={user} />
      </div>
      <div className="message__info">
        <div className="message__bubble">
          <p className="message__text">111</p>
        </div>

        <span className="message__date">
          <Time date={date} />
        </span>
      </div>
    </div>
  </div>
);

export default Message;
