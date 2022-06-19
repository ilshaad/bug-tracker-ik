import React from "react";

import "../styles/views/Dashboard.scss";

// import * as bootstrap from "bootstrap";

import { Container } from "react-bootstrap";
import BackToTop_link from "../components/BackToTop_link";
import DisplayAssignedTicketsList_table from "../components/DisplayAssignedTicketsList_table";
import DisplaySubmittedTicketsList_table from "../components/DisplaySubmittedTicketsList_table";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import TitlePage from "../components/TitlePage";
import auth0User from "../helpers/auth0User";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { ticket_type } from "../types/tickets_type";

export default function Dashboard(): JSX.Element {
  const auth0UserObject = auth0User(
    () => null,
    (userObject) => userObject
  );

  // Array of tickets that user is assigned (assigned_user) to only
  // use for passing to DisplayAssignedTicketsList_table component props
  const userAssignedTickets_array: Array<ticket_type> = [];

  // Array of tickets that user is sumbitted (submitted_by) to only
  // use for passing to DisplaySubmittedTicketsList_table component props
  const userSubmittedTickets_array: Array<ticket_type> = [];

  // cycle through the tickets to get user assigned & submitted tickets
  // remember the state ticket is an object with property name of ticket_id, which than finally contain the ticket object
  useAppSelector((state) => {
    // removing the object wrapper container the property name of ticket_id & converting it straightup into a array of ticket objects
    const ticketsList_array = Object.values(state.tickets);

    ticketsList_array.forEach((ticket) => {
      // check if user is assigned to the ticket
      if (
        ticket.assigned_user?.toLowerCase() ===
        auth0UserObject.nickname?.toLowerCase()
      ) {
        // place all the user assigned tickets to userAssignedTickets_array
        userAssignedTickets_array.push(ticket);
      }

      if (
        ticket.submitted_by?.toLowerCase() ===
        auth0UserObject.nickname?.toLowerCase()
      ) {
        // place all the user submitted tickets to userSubmittedTickets_array
        userSubmittedTickets_array.push(ticket);
      }
    });
  });

  const dispatch = useAppDispatch();
  const messageToast = useAppSelector((state) => state.messageToasts.message);

  // return user nickname (username) from auth0 user object
  const displayUserName = () => {
    if (auth0UserObject === null) return "...";

    return auth0UserObject.nickname;
  };

  return (
    <Container>
      <SeoReactHelmet
        pageTitle="Dashboard / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Dashboard / Bug Tracker - Dashboard - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Dashboard Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      {/* message toast for user confirmation such as success or failure in creating a ticket */}
      <Message_toast />

      <TitlePage titleName="My Dashboard" />

      <div id="Dashboard-assignedTable">
        <h2 className="text-secondary">Assigned tickets</h2>
        {/* {listOfUserAssignedTickets()} */}
        <DisplayAssignedTicketsList_table
          userAssignedTickets_array={userAssignedTickets_array}
          auth0UserObject={auth0UserObject}
        />
      </div>

      <div id="Dashboard-submittedTable">
        <h2 className="text-secondary">Submitted tickets</h2>
        {/* {listOfUserSubmittedTickets()} */}

        <DisplaySubmittedTicketsList_table
          userSubmittedTickets_array={userSubmittedTickets_array}
          auth0UserObject={auth0UserObject}
        />
      </div>

      <BackToTop_link className="dashboard-backToTop_link" />
    </Container>
  );
} //END Dashboard component
