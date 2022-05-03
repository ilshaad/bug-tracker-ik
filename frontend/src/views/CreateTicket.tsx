import React from "react";
import CreateTicketForm from "../components/CreateTicketForm";
import SeoReactHelmet from "../components/SeoReactHelmet";

export default function CreateTicket(): JSX.Element {
  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from Create ticket"
        metaDescriptionContent="mDescContent-createticket"
        metaKeywordsContent="createticket & etc"
      />

      <h1>CreateTicket PAGE</h1>
      <CreateTicketForm />
    </div>
  );
} //END CreateTicket component
