import React, { useContext, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import { SocketContext } from '../../App';

import './style.scss';

interface IChatInput {
  id?: string;
}

const ChatInput: React.FC<IChatInput> = ({ id }) => {
  const { socketContext } = useContext(SocketContext);

  const [value, setValue] = useState('');

  const handleSend = () => {
    if (socketContext.socket && id && value) {
      socketContext.socket.emit('ROOM:NEW_MESSAGE', {
        chatRoomId: id,
        text: value,
      });

      setValue('');
    }
  };

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        handleSend();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className="chat-input">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="large"
        placeholder="Введите текст сообщения…"
      />
      <div className="chat-input__actions" onClick={handleSend}>
        <Button type="link" shape="circle" icon={<SendOutlined />} />
      </div>
    </div>
  );
};

export default ChatInput;
