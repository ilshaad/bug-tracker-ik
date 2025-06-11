import React, { JSX, useEffect } from "react";
import { Container } from "react-bootstrap";
import BackToTop_link from "../components/BackToTop_link";
import DisplayTicketsList_table from "../components/DisplayTicketsList_table";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import TitlePage from "../components/TitlePage";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_ticketList_actions } from "../models/reducers/tickets_slice";
import "../styles/views/TicketList.css";

export default function TicketList(): JSX.Element {
  const dispatch = useAppDispatch();
  const ticketsList_dictionary = useAppSelector((state) => state.tickets);
  const numberOfTickets = Object.keys(ticketsList_dictionary).length;
  // when page first loads fetch all tickets list for redux ticket reducer store to collect
  // still fetches in login screen so not ideal, but decide to leave it for now, you can optimize this later if you wish
  // only call the tickets 5 times before you give up (the one extra is react first render which does not count)
  let numberOfFailedFetchCallbacksAllowed = 6;

  useEffect(() => {
    async function refetchRequest() {
      // if no tickets in redux store than get all the tickets
      if (numberOfTickets === 0) {
        // you get 5 total request call otherwise give up fetching ticket
        if (numberOfFailedFetchCallbacksAllowed !== 0) {
          await dispatch(get_ticketList_actions());

          numberOfFailedFetchCallbacksAllowed -= 1;
        }
      }
    }

    refetchRequest();
  }); //END useEffect()

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
