import React from 'react';

import './style.scss';

interface IAuth {
  children: JSX.Element;
}

const Auth: React.FC<IAuth>  = ({ children }) => (
  <section className="auth">
    <div className="auth__content">
      {children}
    </div>
  </section>
);

export default Auth;