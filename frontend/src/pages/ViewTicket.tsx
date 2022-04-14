import React from "react";
import SeoReactHelmet from "../components/SeoReactHelmet";

export default function ViewTicket(): JSX.Element {
  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from view ticket"
        metaDescriptionContent="mDescContent-view ticket"
        metaKeywordsContent="view ticket & etc"
      />

      <h1>ViewTicket:ticketid PAGE</h1>
    </div>
  );
} //END ViewTicket component
