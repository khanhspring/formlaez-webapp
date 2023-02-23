import * as _ from "lodash";
import { useRef } from "react";

type InputFunc = (...args: any) => void;
type DebouncedType = _.DebouncedFunc<InputFunc>;

export const useDebounced = (func: InputFunc, wait: number = 700): DebouncedType => {
  const debouncedFunc = useRef(_.debounce(func, wait)).current;

  return debouncedFunc;
};
