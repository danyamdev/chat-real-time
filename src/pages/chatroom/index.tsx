import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';

import { Block, Messages, ChatInput, Button } from 'components/index';
import Avatar from 'components/avatar';

import { chatRoomAPI } from 'api/chat-room';
import { SocketContext } from '../../App';
import notification from 'helpers/notification';

import './styles.scss';

type TParams = {
  id: string;
};

type TChatRoom = {
  _id: string;
  userId: string;
  name: string;
};

type TUser = {
  login: string;
  userId: string;
};

const ChatRoom: React.FC = () => {
  const { socketContext } = useContext(SocketContext);

  const { id } = useParams<TParams>();

  const navigate = useNavigate();

  const [chatRoom, setChatRoom] = useState<TChatRoom>();
  const [users, setUsers] = useState<TUser[]>([]);

  const getByIdChatRoom = async () => {
    if (socketContext.socket && id) {
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

  const exitHelper = () => {
    if (socketContext.socket) {
      socketContext.socket.emit('ROOM:LEAVE');

      navigate('/chat-rooms');
    }
  };

  const setUsersHelper = (users: TUser[]) => {
    setUsers(users);
  };

  const noticeHelper = (obj: { text: string; owner: string }) => {
    if (obj.owner !== socketContext.user?.userId) {
      notification({
        type: 'info',
        message: 'Уведомление',
        description: obj.text,
      });
    }
  };

  useEffect(() => {
    getByIdChatRoom();
  }, []);

  useEffect(() => {
    if (socketContext.socket) {
      socketContext.socket.on('ROOM:SET_USERS', setUsersHelper);
      socketContext.socket.on('ROOM:OWNER', noticeHelper);
    }
  }, [socketContext.socket]);

  return (
    <section className="chat-room">
      <Block className="wrapper">
        <>
          <div className="chat-room__sidebar">
            <div className="chat-room__sidebar-header">
              <TeamOutlined />
              <span>Список пользователей</span>
            </div>

            <div className="chat-room__sidebar-users">
              {users.map((user) => (
                <div key={user.userId} className="chat-room__sidebar-user">
                  <Avatar user={user} />
                  <span>{user.login}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-room__dialog">
            <div className="chat-room__dialog-header">
              <span className="chat-room__dialog-name">{chatRoom?.name}</span>
              <Button type="primary" onClick={exitHelper}>
                Выйти
              </Button>
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
