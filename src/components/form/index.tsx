import React from 'react';
import { Link } from 'react-router-dom';
import { Form as FormAntd, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Block, Button } from '../index';

interface IForm {
  title: string;
  description: string;
  formName: string
  buttonText: string;
  link: string,
  linkText: string;
}

const Form: React.FC<IForm> = ({
  title,
  description,
  formName,
  buttonText,
  link,
  linkText
  }) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  return (
    <>
      <div className="auth__top">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Block>
        <FormAntd name={formName} className="auth-form" onFinish={onFinish}>
          <FormAntd.Item
            name="login"
            rules={[
              { required: true, message: 'Заполните' },
              { min: 3, max: 10, message: 'Символов от 3 до 10' },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
              size="large"
              placeholder="login"
            />
          </FormAntd.Item>
          <FormAntd.Item
            name="password"
            rules={[
              {required: true, message: 'Заполните' },
              { min: 6, max: 8, message: 'Символов от 6 до 8' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
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
  )
};

export default Form;