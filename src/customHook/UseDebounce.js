import { useRef } from "react";

export default function UseDebounce(callBack, delay) {
  let timeRef = useRef(null);

  return function () {
    let cont = this;
    let args = arguments;

    clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      callBack.apply(cont, args);
    }, delay);
  };
}
