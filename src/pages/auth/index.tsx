import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import './style.scss';
import { SocketContext } from '../../App';

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
}

export default Auth;
