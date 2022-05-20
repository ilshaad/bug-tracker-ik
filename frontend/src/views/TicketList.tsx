import React, { useEffect } from "react";
import DisplayTicketsList_table from "../components/DisplayTicketsList_table";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";
import Ticket_anchorLinkToTicket from "../components/Ticket_anchorLinkToTicket";

export default function TicketList(): JSX.Element {
  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from ticket list"
        metaDescriptionContent="mDescContent-ticket list"
        metaKeywordsContent="ticket list and etc"
      />

      <h1>TicketList PAGE</h1>

      <DisplayTicketsList_table />
    </div>
  );
} //END TicketList component
