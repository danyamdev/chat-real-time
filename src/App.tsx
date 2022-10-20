import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from 'routes';
import { initialContext, TContext, TSocketContext } from 'context/index';
import { installSocket } from 'socket/index';

export const SocketContext = createContext<TSocketContext>({
  socketContext: initialContext,
  updateSocketContext: () => {
    console.log('updating socket context');
  },
});

const App: React.FC = () => {
  const [socketContext, setSocketContext] = useState<TContext>({
    ...initialContext,
  });

  const updateSocketContext = useCallback(
    (updatedValues: Partial<TContext>) => {
      const targetObj = { ...socketContext, ...updatedValues };

      setSocketContext(targetObj);
    },
    [socketContext],
  );

  useEffect(() => {
    const socket = installSocket();
    const auth: any = socket?.auth;

    updateSocketContext({
      socket: socket,
      user: socket
        ? JSON.parse(window.atob(auth.token?.split(' ')[1]?.split('.')[1]))
        : null,
      setupSocket: installSocket,
    });
  }, []);

  const contextProviderValue = { socketContext, updateSocketContext };

  return (
    <SocketContext.Provider value={contextProviderValue}>
      <div className="wrapper">
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </div>
    </SocketContext.Provider>
  );
};

export default App;
