import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { routes } from 'routes';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Routes>
        {routes.map((r) =>
          <Route
            key={r.path}
            path={r.path}
            element={r.element}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
