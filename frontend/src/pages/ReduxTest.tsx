import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../redux/reducers/counterSlice";

export default function ReduxRoute() {
  const countN = useAppSelector((state) => state.counter.value);

  const dispatchy = useAppDispatch();

  const incrementAction = (): void => {
    dispatchy(increment());
  };

  const decrementAction = (): void => {
    dispatchy(decrement());
  };

  const incrementByAmountAction = (): void => {
    dispatchy(incrementByAmount(6));
  };

  return (
    <div>
      <h1>I am redux page</h1>
      <h1>{countN}</h1>
      <button onClick={incrementAction}>increment button</button>
      <button onClick={decrementAction}>decrement button</button>
      <button onClick={incrementByAmountAction}>
        increment by amount of 6 button
      </button>
    </div>
  );
}
