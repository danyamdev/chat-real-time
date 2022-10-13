import React from 'react';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

import { Message } from 'components/index';

import './style.scss';

type TMessages = {
  items: any[];
};

const Messages: React.FC<TMessages> = ({ items }) => {
  return (
    <div
      className={classNames(
        'messages',
        // { "messages--loading": isLoading }
      )}
    >
      {items.map((item) => (
        <Message key={item.user._id} {...item} />
      ))}
      {/*{isLoading ? (*/}
      {/*  <Spin size="large" tip="Загрузка сообщений..." />*/}
      {/*) : items && !isLoading ? (*/}
      {/*  items?.length > 0 ? (*/}
      {/*    items.map(item => <Message key={item._id} {...item} />)*/}
      {/*  ) : (*/}
      {/*    <Empty description="Диалог пуст" />*/}
      {/*  )*/}
      {/*) : (*/}
      {/*  <Empty description="Откройте диалог" />*/}
      {/*)}*/}
    </div>
  );
};

export default Messages;
