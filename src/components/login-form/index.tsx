import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'components';

import { auth } from 'services/auth';
import { TValues } from 'components/form';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: TValues) => {
    await auth(
      values,
      'login',
      'Аторизация',
      'Авторизация прошла успешно!'
    ).then(res => {
      if (res?.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        navigate('/chat-rooms');
      }
    });
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
