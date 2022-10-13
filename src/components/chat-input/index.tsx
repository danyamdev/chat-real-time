import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import './style.scss';

const ChatInput: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="chat-input">
      <Input
        onChange={(e) => setValue(e.target.value)}
        size="large"
        placeholder="Введите текст сообщения…"
      />
      <div className="chat-input__actions">
        <Button type="link" shape="circle" icon={<CheckCircleOutlined />} />
      </div>
    </div>
  );
};

export default ChatInput;
