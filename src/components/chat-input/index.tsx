import React, { useContext, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import { SocketContext } from '../../App';

import './style.scss';

type TChatInput = {
  id?: string
}

const ChatInput: React.FC<TChatInput> = ({ id }) => {
  const { socketContext } = useContext(SocketContext);

  const [value, setValue] = useState('');

  const sendHelper = () => {
    if (socketContext.socket && id && value) {
      socketContext.socket.emit("ROOM:NEW_MESSAGE", {
        chatRoomId: id,
        text: value
      });

      setValue('');
    }
  };

  return (
    <div className="chat-input">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="large"
        placeholder="Введите текст сообщения…"
      />
      <div className="chat-input__actions" onClick={sendHelper}>
        <Button type="link" shape="circle" icon={<SendOutlined />} />
      </div>
    </div>
  );
};

export default ChatInput;
