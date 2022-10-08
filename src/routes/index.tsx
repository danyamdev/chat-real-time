import React from 'react';

import { LoginForm, RegisterForm } from '../components';
import { Auth } from '../pages';

export type TRoute = {
  path: string;
  element: React.ReactNode;
};

export const routes: TRoute[] = [
  {
    path: "/",
    element: <Auth children={<LoginForm />}/>,
  },
  {
    path: "/register",
    element: <Auth children={<RegisterForm />}/>,
  },
];