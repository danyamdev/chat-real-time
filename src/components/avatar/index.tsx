import React from 'react';

import generateAvatarFromHash from 'utils/generateAvatarFromHash';

import './style.scss';

type TAvatar = {
  user: any;
};

const Avatar: React.FC<TAvatar> = ({ user }) => {
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
