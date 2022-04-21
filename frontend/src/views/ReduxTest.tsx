import React, { useEffect } from "react";
import { createTicket_dispatch_type } from "../@types/ticketsSlice_types.t";

import { useAppSelector, useAppDispatch } from "../models/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../models/reducers/counterSlice";
import {
  get_ticketList_actions,
  post_createTicket_actions,
} from "../models/reducers/tickets/ticketsSlice";

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

  useEffect(() => {
    // dispatchy(fetchAllTickets_actions());
    dispatchy(get_ticketList_actions());
  }, [dispatchy]);

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

  const createTicketReduxAction = () => {
    console.log(111);
    const createTicketObject: createTicket_dispatch_type = {
      title: "client create",
      description: "client create",
      submitted_by: "client create",
      priority: "high",
      assigned_user: "client create",
      status: "client create",
      app_name: "client create",
      app_version: "client create",
    };

    dispatchy(post_createTicket_actions(createTicketObject));
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
          fetched ticketsState on tickets slice
        </button>
      </div>
      <div>
        <button onClick={createTicketReduxAction}>post_createTicket</button>
      </div>
    </div>
  );
}
