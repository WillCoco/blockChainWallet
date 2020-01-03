import React from 'react';
import WVEvent from './WVEvent';
import {safeParse} from '../utils/safetyFn';

const useEventListener = (eventType, callback) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    function handler(json) {
      const v = safeParse(json);
      setData(v);
      callback && callback(v);
    }
    WVEvent.on(eventType, handler);
    return () => {
      WVEvent.off(eventType, handler);
    };
  });

  return data;
};

module.exports = useEventListener;
