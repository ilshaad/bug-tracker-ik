import React, { useEffect } from "react";
// import AuthenticateRoute from "../components/AuthenticateRoute";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";

import { useAppSelector, useAppDispatch } from "../models/hooks";
import { get_ticketList_actions } from "../models/reducers/tickets/ticketsSlice";

export default function TicketList(): JSX.Element {
  const ticketsList = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(ticketsList);
    // dispatch(get_ticketList_actions());
    // console.log(ticketsList);
  }, [dispatch]);

  const listOfTickets = () => {
    if ("null" in ticketsList) {
      return null;
    }

    const arrayList: Array<JSX.Element> = [];

    for (let property in ticketsList) {
      // console.log(property);
      arrayList.push(<li key={property}>{ticketsList[property].title}</li>);
    }
    return arrayList;
  };

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from ticket list"
        metaDescriptionContent="mDescContent-ticket list"
        metaKeywordsContent="ticket list & etc"
      />

      <h1>TicketList PAGE</h1>
      <LogoutButton />
      <Profile />
      <ul>{listOfTickets()}</ul>
    </div>
  );
} //END TicketList component
