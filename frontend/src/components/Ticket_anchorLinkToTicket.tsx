// ! I am not sure this is being used & perhaps could be deleted afterwards

import React from "react";
import { Link } from "react-router-dom";
import { ticket_type } from "../types/tickets_type";

type Props = { ticket: ticket_type };

export default function Ticket_anchorLinkToTicket({ ticket }: Props) {
  return <Link to={`/viewticket/${ticket.ticket_id}#top`}>{ticket.title}</Link>;
}
