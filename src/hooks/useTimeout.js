/**
 * setTimeout
 */
import React, {useEffect, useRef} from 'react';

function useTimeout(callback, duration) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => savedCallback.current(), duration);
    return () => clearTimeout(id);
  }, [duration]);
}

export default useTimeout;
