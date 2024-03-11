import { useRef } from "react";

export function useDebounceFn(cb, delay = 1000) {
  const timerRef = useRef(null);

  return () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(cb, delay);
  };
}
