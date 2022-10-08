import React from 'react';
import { Button as BaseButton } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ButtonHTMLType, ButtonType } from 'antd/lib/button/button';

import './style.scss';

interface TButton {
  children: string;
  className?: string;
  size?: SizeType;
  type?: ButtonType;
  onClick?: () => void;
  htmlType?: ButtonHTMLType
};

const Button: React.FC<TButton> = (props) => (
  <BaseButton
    {...props}
    className={`button ${props.className} 
    ${props.size === "large" ? "button--large" : ""}`}
  />
);

export default Button;