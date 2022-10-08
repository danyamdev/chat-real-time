import React from 'react';
import axios from 'axios';

import { Form } from 'components';

import { TValues } from 'components/form';

const RegisterForm: React.FC = () => {
  const onFinish = async (values: TValues) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', values, {
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
      title="Регистрация"
      description="Для входа в чат, вам нужно зарегистрироваться"
      formName="register"
      buttonText="Зарегистрироваться"
      link="/"
      linkText="Войти в аккаунт"
      onFinish={onFinish}
    />
  );
};

export default RegisterForm;
