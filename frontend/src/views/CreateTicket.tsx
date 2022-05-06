import React from "react";
import CreateTicket_form from "../components/CreateTicket_form";
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
      <CreateTicket_form />
    </div>
  );
} //END CreateTicket component
