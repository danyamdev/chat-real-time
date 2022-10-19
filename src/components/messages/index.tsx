import React, { useContext, useEffect, useRef, useState } from 'react';
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

type TMessage = {
  _id: string;
  chatroom: string;
  user: any;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const Messages: React.FC = () => {
  const { socketContext } = useContext(SocketContext);

  const { id } = useParams<TParams>();

  const [messages, setMessages] = useState<TMessage[]>([]);

  const messagesRef = useRef<HTMLDivElement>(null);

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
    if (socketContext.socket) {
      socketContext.socket.on('ROOM:NEW_MESSAGE', (message: TMessage) => {
        setMessages([...messages, message]);
      });
    }
  }, [socketContext.socket, messages]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    messagesRef.current && messagesRef.current.scrollTo(0, 99999);
  }, [messagesRef, messages]);

  return (
    <div
      ref={messagesRef}
      className={classNames('messages', {
        'messages-empty': messages.length === 0,
      })}
    >
      {messages.length > 0 ? (
        messages.map((item) => (
          <Message
            key={item._id}
            user={item.user}
            message={item.message}
            time={item.createdAt}
            id={socketContext.user?.userId}
          />
        ))
      ) : (
        <Empty description="Диалог пуст" />
      )}
    </div>
  );
};

export default Messages;
