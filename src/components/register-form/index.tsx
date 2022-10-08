import React from 'react';

import { Form } from 'components';

const RegisterForm: React.FC = () => {
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  return (
    <Form
      title="Регистрация"
      description="Для входа в чат, вам нужно зарегистрироваться"
      formName="register"
      buttonText="Зарегистрироваться"
      link="/"
      linkText="Войти в аккаунт"
    />
  );
};

export default RegisterForm;
