import React, { useEffect } from "react";
import DisplayTicketsList from "../components/DisplayTicketsList";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";
import Ticket_anchorLinkToTicket from "../components/Ticket_anchorLinkToTicket";
import {
  sortNameByAscendingOrder_array,
  sortNameByDescendingOrder_array,
} from "../helpers/sortByAlphabet";
import {
  sortPriorityByAscendingOrder_array,
  sortPriorityByDescendingOrder_array,
} from "../helpers/sortByPriority";

import { useAppSelector, useAppDispatch } from "../models/hooks";

export default function TicketList(): JSX.Element {
  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from ticket list"
        metaDescriptionContent="mDescContent-ticket list"
        metaKeywordsContent="ticket list and etc"
      />

      <h1>TicketList PAGE</h1>
      {/* <ul>{listOfTickets()}</ul> */}
      <DisplayTicketsList />
    </div>
  );
} //END TicketList component
