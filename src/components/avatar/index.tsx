import React from 'react';

import generateAvatarFromHash from 'utils/generateAvatarFromHash';
import { TUser, TUserToken } from 'types/user.type';

import './style.scss';

interface IAvatar {
  user: TUserToken | TUser;
}

const Avatar: React.FC<IAvatar> = ({ user }) => {
  const { color, colorLighten } = generateAvatarFromHash(user.login);
  const firstChar = user.login[0].toUpperCase();

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
      }}
      className="avatar avatar--symbol"
    >
      {firstChar}
    </div>
  );
};

export default Avatar;
