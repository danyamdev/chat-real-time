import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { SocketContext } from '../../App';

interface IProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { socketContext } = useContext(SocketContext);

  if (!socketContext.socket) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
