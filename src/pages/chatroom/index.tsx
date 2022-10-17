import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';

import { Block, Messages, ChatInput } from 'components/index';

import { chatRoomAPI } from 'api/chat-room';

import './styles.scss';

type TParams = {
  id: string;
};

type TChatRoom = {
  _id: string;
  userId: string;
  name: string;
};

const ChatRoom: React.FC = () => {
  const { id } = useParams<TParams>();

  const [chatRoom, setChatRoom] = useState<TChatRoom>();

  const token = localStorage.getItem('token');

  const getByIdChatRoom = async () => {
    if (token && id) {
      try {
        const response = await chatRoomAPI.getById(id);

        if (response.data.status === 'success') {
          setChatRoom(response.data.chatRoom);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getByIdChatRoom();
  }, []);

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
              <span className="chat-room__dialog-name">{chatRoom?.name}</span>
            </div>
            <div className="chat-room__dialog-messages">
              <Messages />
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
