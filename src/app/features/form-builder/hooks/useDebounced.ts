import { useCallback, useRef } from "react";

type InputFunc = (...args: any) => void;
type ResultType = (...args: any) => void;

export const useDebounced = (
  func: InputFunc,
  wait: number = 500
): ResultType => {
  const timeout = useRef<any>(null);

  const debouncedFunc = useCallback((...args: any) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      func(...args);
    }, wait);
  }, [func, wait]);

  return debouncedFunc;
};
