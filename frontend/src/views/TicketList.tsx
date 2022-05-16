import React, { useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";
import Ticket_anchorLinkToTicket from "../components/Ticket_anchorLinkToTicket";
import {
  sortNameByAscendingOrder_array,
  sortNameByDescendingOrder_array,
} from "../helpers/sortByAlphabet";

import { useAppSelector, useAppDispatch } from "../models/hooks";

export default function TicketList(): JSX.Element {
  const ticketsList = useAppSelector((state) => state.tickets);

  const listOfTickets = () => {
    // true if ticketlist is empty than return a statement to user
    if (Object.keys(ticketsList).length === 0) {
      return <h3>No tickets available</h3>;
    }

    console.log(11);
    console.log(ticketsList);
    // const ticketListArray = Object.values(ticketsList);

    // array list of ticket list
    const arrayList: Array<JSX.Element> = [];

    for (let property in ticketsList) {
      // console.log(ticketsList[property]);
      // arrayList.push(<li key={property}>{ticketsList[property].title}</li>);
      arrayList.push(
        <li key={property}>
          <Ticket_anchorLinkToTicket ticket={ticketsList[property]} />
        </li>
      );
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
      <ul>{listOfTickets()}</ul>
    </div>
  );
} //END TicketList component
