import React from 'react';

import { Form } from 'components';

const LoginForm: React.FC = () => {
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };
  
  return (
    <Form
      title="Войти в аккаунт"
      description="Пожалуйста, войдите в свой аккаунт"
      formName="login"
      buttonText="Войти в аккаунт"
      link="/register"
      linkText="Зарегистрироваться"
    />
  )
};

export default LoginForm;