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
        pageTitle="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Tickets list Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      <h1>TicketList PAGE</h1>

      <DisplayTicketsList_table />
    </div>
  );
} //END TicketList component
