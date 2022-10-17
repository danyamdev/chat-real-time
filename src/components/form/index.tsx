import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form as FormAntd, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios';

import { Block, Button } from 'components';

import { SocketContext } from '../../App';

export type TValues = {
  login: string;
  password: string;
};

interface IForm {
  title: string;
  description: string;
  formName: string;
  buttonText: string;
  link: string;
  linkText: string;
  onFinish: (values: TValues) => Promise<AxiosResponse<any, any> | undefined>;
}

const Form: React.FC<IForm> = ({
  title,
  description,
  formName,
  buttonText,
  link,
  linkText,
  onFinish,
}) => {
  const { socketContext, updateSocketContext } = useContext(SocketContext);
  
  const navigate = useNavigate();

  const onFinishHelper = (values: TValues) => {
    onFinish(values).then((res) => {
      if (res?.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        const socket = socketContext.setupSocket();
        updateSocketContext({ socket: socket });
        navigate('/chat-rooms');
      }
    });
  };

  return (
    <>
      <div className="auth__top">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Block>
        <FormAntd
          name={formName}
          className="auth-form"
          onFinish={onFinishHelper}
        >
          <FormAntd.Item
            name="login"
            rules={[
              { required: true, message: 'Заполните' },
              { min: 3, max: 10, message: 'Символов от 3 до 10' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              placeholder="login"
            />
          </FormAntd.Item>
          <FormAntd.Item
            name="password"
            rules={[
              { required: true, message: 'Заполните' },
              { min: 6, max: 8, message: 'Символов от 6 до 8' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              placeholder="Password"
            />
          </FormAntd.Item>
          <FormAntd.Item>
            <Button type="primary" htmlType="submit" size="large">
              {buttonText}
            </Button>
          </FormAntd.Item>
          <Link className="auth-link" to={link}>
            {linkText}
          </Link>
        </FormAntd>
      </Block>
    </>
  );
};

export default Form;
