/**
 * setInterval
 */
import React, {useEffect, useRef} from 'react';

function useInterval(callback, duration) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), duration);
    return () => clearInterval(id);
  }, [duration]);
}

export default useInterval;
