import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';
import classNames from 'classnames';

import { Message } from 'components/index';
import { messagesAPI } from 'api/messages';
import { SocketContext } from '../../App';

import './style.scss';

type TParams = {
  id: string;
};

const Messages: React.FC = () => {
  const { socketContext } = useContext(SocketContext);

  const { id } = useParams<TParams>();

  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    if (socketContext.socket && id) {
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
