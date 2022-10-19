import React from 'react';

import { LoginForm, RegisterForm, ProtectedRoute } from 'components';
import { Auth, ChatRooms, ChatRoom } from 'pages';

export type TRoute = {
  path: string;
  element: React.ReactNode;
};

export const routes: TRoute[] = [
  {
    path: '/',
    element: <Auth children={<LoginForm />} />,
  },
  {
    path: '/register',
    element: <Auth children={<RegisterForm />} />,
  },
  {
    path: '/chat-rooms',
    element: (
      <ProtectedRoute>
        <ChatRooms />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chat-rooms/:id',
    element: (
      <ProtectedRoute>
        <ChatRoom />
      </ProtectedRoute>
    ),
  },
];
