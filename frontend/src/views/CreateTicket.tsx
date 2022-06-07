import React from "react";
import { Container } from "react-bootstrap";
// import "../public/styles/views/CreateTicket.scss";
import CreateTicket_form from "../components/CreateTicket_form";
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

      <TitlePage titleName="Create Ticket" />

      <CreateTicket_form />
    </Container>
  );
} //END CreateTicket component
