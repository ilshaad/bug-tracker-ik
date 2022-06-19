import React from "react";
import { Container } from "react-bootstrap";
// import "../styles/views/CreateTicket.scss";
import CreateTicket_form from "../components/CreateTicket_form";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import TitlePage from "../components/TitlePage";

export default function CreateTicket(): JSX.Element {
  return (
    <Container>
      <SeoReactHelmet
        pageTitle="Create ticket / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Create ticket / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Create ticket Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      {/* message toast for user confirmation such as success or failure in creating a ticket */}
      <Message_toast />

      <TitlePage titleName="Create Ticket" />

      <CreateTicket_form />
    </Container>
  );
} //END CreateTicket component
