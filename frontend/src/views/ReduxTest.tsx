import React from "react";

import { useAppSelector, useAppDispatch } from "../models/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../models/reducers/counterSlice";
import { get_ticketList_actions } from "../models/reducers/tickets/ticketsSlice";

import { loginAction, logoutAction } from "../models/reducers/userProfileSlice";

interface userP {
  email: string;
  name: string; //from auth0 nickname or psql name
  role: string;
  created_on: string;
  avatar: string; //from auth0 picture
}

export default function ReduxRoute(): JSX.Element {
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

  const loginReduxAction = () => {
    const loginObject = {
      email: "any@mail.com",
      name: "anyname",
      role: "Nonadmin",
      created_on: "2023-01-22",
      avatar: "iKurl",
    };
    dispatchy(loginAction(loginObject));
  };

  const logoutReduxAction = () => {
    dispatchy(logoutAction());
  };

  // *******************
  // ticketsState redux section *****************
  const ticketsState = useAppSelector((state) => state.tickets);

  const getAllTicketsReduxAction = () => {
    console.log(ticketsState);

    // dispatchy(fetchAllTickets_actions());
    dispatchy(get_ticketList_actions());

    console.log(ticketsState);
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
      <button onClick={loginReduxAction}>login redux</button>
      <button onClick={logoutReduxAction}>logout redux</button>
      <div>
        <h4>ticketsState buttons</h4>
        <button onClick={getAllTicketsReduxAction}>
          console.log ticketsState
        </button>
      </div>
    </div>
  );
}
