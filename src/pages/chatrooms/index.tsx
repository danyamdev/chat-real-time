import React from 'react';
import { Form, Input } from 'antd';
import { WechatOutlined, DeleteTwoTone } from '@ant-design/icons';

import { Block, Button } from 'components/index';

import './styles.scss';

const ChatRooms: React.FC = () => {
  return (
    <section className="chat-rooms">
      <Block>
        <>
          <div className="chat-rooms-create">
            <Form
              name="chatroom"
              className="auth-form"
              onFinish={(values) => console.log(values)}
            >
              <Form.Item
                name="chatroom"
                rules={[
                  { required: true, message: 'Заполните' },
                  { min: 3, max: 10, message: 'Символов от 3 до 10' },
                ]}
              >
                <Input
                  prefix={<WechatOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  size="large"
                  placeholder="Название чата"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </Form.Item>
            </Form>
          </div>
          <hr/>
          <p>Чаты</p>
          <div className="chat-rooms-list">
            <div className="chat-rooms-item">
              sdfds
            </div>
            <div className="chat-rooms-item">
              sdfds
            </div>
            <div className="chat-rooms-item">
              sdfds
            </div>
            <div className="chat-rooms-item">
              sdfds
            </div>
            <div className="chat-rooms-item">
              sdfds
            </div>
          </div>
          <hr/>
          <p>Мои чаты</p>
          <div className="chat-rooms-list">
            <div className="chat-rooms-item">
              sdfds
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
            <div className="chat-rooms-item">
              sdfds
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
            <div className="chat-rooms-item">
              sdfds
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
            <div className="chat-rooms-item">
              sdfds
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
            <div className="chat-rooms-item">
              sdfds
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </div>
          </div>
        </>
      </Block>
    </section>
  );
};

export default ChatRooms;
