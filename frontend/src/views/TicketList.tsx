import React from "react";
import { Container } from "react-bootstrap";
import BackToTop_link from "../components/BackToTop_link";
import DisplayTicketsList_table from "../components/DisplayTicketsList_table";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import TitlePage from "../components/TitlePage";
import "../styles/views/TicketList.scss";

export default function TicketList(): JSX.Element {
  return (
    <Container id="TicketList-component">
      <SeoReactHelmet
        pageTitle="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Tickets list / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Tickets list Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      {/* message toast for user confirmation such as success or failure in creating a ticket */}
      <Message_toast />

      <TitlePage titleName="Ticket list" />

      <DisplayTicketsList_table />

      <BackToTop_link className="ticketList-backToTop_link" />
    </Container>
  );
} //END TicketList component
