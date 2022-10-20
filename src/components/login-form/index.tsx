import React from 'react';

import { Form } from 'components';

import { auth } from 'services/auth';
import { TValues } from 'types/form-values.type';

const LoginForm: React.FC = () => {
  const onFinish = async (values: TValues) =>
    await auth(values, 'login', 'Аторизация', 'Авторизация прошла успешно!');

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
