import React from 'react';

import './style.scss';

interface IBlock {
  children: JSX.Element;
  className?: string;
}

const Block: React.FC<IBlock> = ({ children, className }) => (
  <div className={`block ${className}`}>{children}</div>
);

export default Block;
