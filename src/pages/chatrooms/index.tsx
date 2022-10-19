import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import { WechatOutlined, DeleteTwoTone } from '@ant-design/icons';
import classNames from 'classnames';

import { Block, Button } from 'components/index';

import { chatRoomAPI } from 'api/chat-room';
import notification from 'helpers/notification';
import { SocketContext } from '../../App';

import './styles.scss';

type TChatRoom = {
  _id: string;
  name: string;
  userId: string;
};

const ChatRooms: React.FC = () => {
  const { updateSocketContext, socketContext } = useContext(SocketContext);

  const navigate = useNavigate();

  const [chatRooms, setChatRooms] = useState<TChatRoom[]>([]);
  const [valueChatRoom, setValueChatRoom] = useState<string>('');

  const logOut = () => {
    updateSocketContext({ socket: null, user: null });
    localStorage.removeItem('token');
  };

  const createChatRoom = async () => {
    if (socketContext.socket) {
      try {
        const response = await chatRoomAPI.postChatRoom({
          name: valueChatRoom,
          userId: socketContext.user?.userId,
        });

        if (response.data.status === 'success') {
          notification({
            type: 'success',
            message: 'Чат',
            description: response.data.message,
          });

          getChatRooms();
        }
      } catch (e: any) {
        notification({
          type: 'error',
          message: 'Ошибка',
          description: e?.response?.data?.message,
        });
      }
    }
  };

  const getChatRooms = async () => {
    if (socketContext.socket) {
      try {
        const response = await chatRoomAPI.getAll();

        if (response.data.status === 'success') {
          setChatRooms(response.data.chatRooms);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const deleteChatRoom = async (id: string) => {
    if (socketContext.socket) {
      socketContext.socket.emit('ROOM:DELETE', id);

      getChatRooms();
    }
  };

  const connectToChatRoom = (id: string) => {
    if (socketContext.socket) {
      socketContext.socket.emit('ROOM:JOIN', id);

      navigate(`/chat-rooms/${id}`);
    }
  };

  useEffect(() => {
    getChatRooms();
  }, []);

  return (
    <section className="chat-rooms">
      <Block>
        <>
          <div className="user">
            Пользователь:
            <span>{socketContext.user?.login}</span>
          </div>
          <hr />
          <div className="chat-rooms-create">
            <Form
              name="chatroom"
              className="auth-form"
              onFinish={createChatRoom}
            >
              <Form.Item
                name="chatroom"
                rules={[
                  { required: true, message: 'Заполните' },
                  { min: 3, max: 10, message: 'Символов от 3 до 10' },
                ]}
              >
                <Input
                  prefix={
                    <WechatOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  size="large"
                  placeholder="Название чата"
                  onChange={(e) => setValueChatRoom(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </Form.Item>
            </Form>
          </div>
          <hr />
          <p>Чаты</p>
          <div
            className={classNames('chat-rooms-list', {
              empty: !chatRooms.length,
            })}
          >
            {!!chatRooms.length ? (
              chatRooms?.map((item) => (
                <div
                  key={item._id}
                  className="chat-rooms-item"
                  onClick={() => connectToChatRoom(item._id)}
                >
                  {item?.name}
                </div>
              ))
            ) : (
              <span> Будь первым! Создай чат! </span>
            )}
          </div>
          <hr />
          <p>Мои чаты</p>
          <div
            className={classNames('chat-rooms-list', {
              empty: !chatRooms.length,
            })}
          >
            {!!chatRooms.length ? (
              chatRooms?.map(
                (item) =>
                  item.userId === socketContext.user?.userId && (
                    <div key={item._id} className="chat-rooms-item">
                      <span onClick={() => connectToChatRoom(item._id)}>
                        {item.name}
                      </span>
                      <span onClick={() => deleteChatRoom(item._id)}>
                        <DeleteTwoTone twoToneColor="#eb2f96" />
                      </span>
                    </div>
                  ),
              )
            ) : (
              <span> У вас пока нет чатов! </span>
            )}
          </div>
          <hr />
          <Button type="primary" onClick={logOut}>
            Выйти
          </Button>
        </>
      </Block>
    </section>
  );
};

export default ChatRooms;
