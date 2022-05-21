import React from "react";
import CreateTicket_form from "../components/CreateTicket_form";
import SeoReactHelmet from "../components/SeoReactHelmet";

export default function CreateTicket(): JSX.Element {
  return (
    <div>
      <SeoReactHelmet
        pageTitle="Create ticket / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Create ticket / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Create ticket Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      <h1>CreateTicket PAGE</h1>
      <CreateTicket_form />
    </div>
  );
} //END CreateTicket component
