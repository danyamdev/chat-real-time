import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

import { Message } from 'components/index';
import { messagesAPI } from 'api/messages';

import './style.scss';

type TParams = {
  id: string;
};

const Messages: React.FC = () => {
  const { id } = useParams<TParams>();

  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem('token');

  const getMessages = async () => {
    if (token && id) {
      try {
        const response = await messagesAPI.getAll(id);

        if (response.data.status === 'success') {
          setMessages(response.data.messages);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div
      className={classNames('messages', {
        'messages-empty': messages.length === 0,
      })}
    >
      {messages.length > 0 ? (
        messages.map((item: any) => <Message key={item._id} {...item} />)
      ) : (
        <Empty description="Диалог пуст" />
      )}
    </div>
  );
};

export default Messages;
