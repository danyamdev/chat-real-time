import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

type TTime = {
  date: string;
};

const Time: React.FC<TTime> = ({ date }) => (
  <>
    {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocale })}
  </>
);

export default Time;
