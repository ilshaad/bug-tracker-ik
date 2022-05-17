import React from "react";
import { useAppSelector } from "../models/hooks";
import Ticket_anchorLinkToTicket from "./Ticket_anchorLinkToTicket";

type Props = {};

export default function DisplayTicketsList({}: Props) {
  const ticketsList = useAppSelector((state) => state.tickets);

  // true if ticketlist is empty than return a statement to user
  if (Object.keys(ticketsList).length === 0) {
    return <h3>No tickets available</h3>;
  }

  // array list of ticket list
  const arrayList: Array<JSX.Element> = [];

  for (let property in ticketsList) {
    arrayList.push(
      <li key={property}>
        <Ticket_anchorLinkToTicket ticket={ticketsList[property]} />
      </li>
    );
  }

  return <ul>{arrayList}</ul>;
}
