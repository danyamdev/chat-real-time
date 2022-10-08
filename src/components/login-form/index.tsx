import React from 'react';
import axios from 'axios';

import { Form } from 'components';

import { TValues } from 'components/form';

const LoginForm: React.FC = () => {
  const onFinish = async (values: TValues) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', values, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('===>response.data', response.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      } else if (error.request) {
        console.log('Request', error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <Form
      title="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
      formName="login"
      buttonText="Войти в аккаунт"
      link="/register"
      linkText="Зарегистрироваться"
      onFinish={onFinish}
    />
  );
};

export default LoginForm;
