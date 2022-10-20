import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { SocketContext } from '../../App';

import './style.scss';

interface IAuth {
  children: JSX.Element;
}

const Auth: React.FC<IAuth> = ({ children }) => {
  const { socketContext } = useContext(SocketContext);

  if (socketContext.socket) {
    return <Navigate to="/chat-rooms" replace />;
  }

  return (
    <section className="auth">
      <div className="auth__content">{children}</div>
    </section>
  );
};

export default Auth;
