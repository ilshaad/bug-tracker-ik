import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import DisplayTicketsList_table from "../components/DisplayTicketsList_table";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";
import Ticket_anchorLinkToTicket from "../components/Ticket_anchorLinkToTicket";
import TitlePage from "../components/TitlePage";

export default function TicketList(): JSX.Element {
  return (
    <Container>
      <SeoReactHelmet
        pageTitle="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Tickets list Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      <TitlePage titleName="Tickets list" />

      <DisplayTicketsList_table />
    </Container>
  );
} //END TicketList component
