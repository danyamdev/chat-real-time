import React from 'react';
import { TeamOutlined } from '@ant-design/icons';

import { Block, Messages, ChatInput } from 'components/index';
import dialogs from '../../dialogs.json';

import './styles.scss';

const ChatRoom: React.FC = () => {
  return (
    <section className="chat-room">
      <Block className="wrapper">
        <>
          <div className="chat-room__sidebar">
            <div className="chat-room__sidebar-header">
              <TeamOutlined />
              <span>Список пользователей</span>
            </div>

            <div className="chat-room__sidebar-users">asdasds</div>
          </div>
          <div className="chat-room__dialog">
            <div className="chat-room__dialog-header">
              <span className="chat-room__dialog-name">Комната 1</span>
            </div>
            <div className="chat-room__dialog-messages">
              <Messages items={dialogs} />
            </div>
            <div className="chat-room__dialog-input">
              <ChatInput />
            </div>
          </div>
        </>
      </Block>
    </section>
  );
};

export default ChatRoom;
