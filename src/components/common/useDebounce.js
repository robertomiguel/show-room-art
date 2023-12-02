import { useEffect } from 'react';

function useDebounce(value, wait, callback) {
  useEffect(() => {
    if (wait === 0) {
      callback(value);
      return;
    }

    const timeoutId = setTimeout(() => {
      callback(value);
    }, wait);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, wait, callback]);
}

export default useDebounce;