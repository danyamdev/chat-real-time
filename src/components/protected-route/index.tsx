import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { SocketContext } from '../../App';

type TProtectedRoute = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<TProtectedRoute> = ({ children }) => {
  const { socketContext } = useContext(SocketContext);

  if (!socketContext.socket) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
