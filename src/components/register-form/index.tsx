import React from 'react';

import { Form } from 'components';

import { auth } from 'services/auth';
import { TValues } from 'types/form-values.type';

const RegisterForm: React.FC = () => {
  const onFinish = async (values: TValues) =>
    await auth(
      values,
      'register',
      'Регистрация',
      'Регистрация прошла успешно!',
    );

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
