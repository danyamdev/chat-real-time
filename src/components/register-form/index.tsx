import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'components';

import { auth } from 'services/auth';
import { TValues } from 'components/form';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: TValues) => {
    await auth(
      values,
      'register',
      'Регистрация',
      'Регистрация прошла успешно!',
    ).then((res) => {
      if (res?.data.status === 'success') {
        localStorage.setItem('token', res.data.token);
        navigate('/chat-rooms');
      }
    });
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
