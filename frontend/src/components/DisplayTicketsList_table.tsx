// display ticket lists in a table using react-bootstrap table
// In the table show: title / priority / assigned_user / status / app_name / app_version / submitted_by / created_on
// - not showing ticket_id / description
// the tickets will be listed by title ascending order first, & than user can choose to rearrange sort option if they wish to

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../models/hooks";
import Ticket_anchorLinkToTicket from "./Ticket_anchorLinkToTicket";
import {
  sortPriorityByAscendingOrder_array,
  sortPriorityByDescendingOrder_array,
} from "../helpers/sortByPriority";
import {
  sortNameByAscendingOrder_array,
  sortNameByDescendingOrder_array,
} from "../helpers/sortByAlphabet";
import {
  sortDateByNewestFirst_array,
  sortDateByOldestFirst_array,
} from "../helpers/sortByDate";

type Props = {};

export default function DisplayTicketsList_table({}: Props) {
  const navigate = useNavigate();

  // remember it is an object with property name of ticket_id, which than finally contain the ticket object
  const ticketsList_dictionary = useAppSelector((state) => state.tickets);

  // removing the object wrapper container the property name of ticket_id & converting it straightup into a array of ticket objects
  const ticketsList_array = Object.values(ticketsList_dictionary);

  // set fold page to display ticket with title sort tickets first
  const titleSortFirst = sortNameByAscendingOrder_array(
    ticketsList_array,
    "title"
  );

  // use this ordered array ticket list for sorting when displaying on the table & user clicks on a sort option to readjust the sort option
  const [sortedTicketsListState, setSortedTicketsListState] =
    useState(titleSortFirst);

  // user can toggle with ascending & descending order of the ticket lists
  // starting off in descending order first
  const [ascendingOrder, setAscendingOrdered] = useState<boolean>(false);

  // table row will have anchor link to view the ticket page
  const navigateToViewTicket = (ticketId: string) => {
    navigate(`/viewticket/${ticketId}`);
  };

  // sort tickets List by alphabetically
  const ticketSortByAlphabet = (ticketProperty: string) => {
    // sort by ascending order
    if (ascendingOrder) {
      const ascendingAlphabet = sortNameByAscendingOrder_array(
        sortedTicketsListState,
        ticketProperty
      );

      // re-sorted the ticket list state
      setSortedTicketsListState(ascendingAlphabet);

      // toggle the ascending state
      setAscendingOrdered(false);
    }
    // sort by descending order
    else if (!ascendingOrder) {
      const descendingAlphabet = sortNameByDescendingOrder_array(
        sortedTicketsListState,
        ticketProperty
      );

      // re-sorted the ticket list state
      setSortedTicketsListState(descendingAlphabet);

      // togle the ascending state
      setAscendingOrdered(true);
    }
  }; // END ticketSortByAlphabet

  // sort tickets List by priority
  const ticketSortByPriority = () => {
    // sort by ascending order
    if (ascendingOrder) {
      const ascendingPriority = sortPriorityByAscendingOrder_array(
        sortedTicketsListState
      );

      // re-sorted the ticket list state
      setSortedTicketsListState(ascendingPriority);

      // toggle the ascending state
      setAscendingOrdered(false);
    }
    // sort by descending order
    else if (!ascendingOrder) {
      const descendingPriority = sortPriorityByDescendingOrder_array(
        sortedTicketsListState
      );

      // re-sorted the ticket list state
      setSortedTicketsListState(descendingPriority);

      // togle the ascending state
      setAscendingOrdered(true);
    }
  }; // END ticketSortByPriority

  // sort tickets List by date
  const ticketSortByDate = () => {
    // sort by ascending order
    if (ascendingOrder) {
      const ascendingDate = sortDateByOldestFirst_array(sortedTicketsListState);

      // re-sorted the ticket list state
      setSortedTicketsListState(ascendingDate);

      // toggle the ascending state
      setAscendingOrdered(false);
    }
    // sort by descending order
    else if (!ascendingOrder) {
      const descendingDate = sortDateByNewestFirst_array(
        sortedTicketsListState
      );

      // re-sorted the ticket list state
      setSortedTicketsListState(descendingDate);

      // togle the ascending state
      setAscendingOrdered(true);
    }
  }; // END ticketSortByDate

  // table body to display the sorted row of each tickets within the ticket list
  const tableBody = () => {
    // array list of ticket list
    const tbodyTicketList_array: Array<JSX.Element> = [];

    for (let ticketObject of sortedTicketsListState) {
      tbodyTicketList_array.push(
        <tr
          onClick={() => navigateToViewTicket(ticketObject.ticket_id)}
          key={ticketObject.ticket_id}
        >
          <td>{ticketObject.title}</td>
          <td>{ticketObject.priority}</td>
          <td>{ticketObject.status}</td>
          <td>{ticketObject.app_name}</td>
          {/* <td>{ticketObject.app_version}</td> */}
          <td>{ticketObject.submitted_by}</td>
          <td>{ticketObject.assigned_user}</td>
          <td>{ticketObject.created_on}</td>
        </tr>
      );
    }

    return <tbody>{tbodyTicketList_array}</tbody>;
  }; // END tableBody

  // if redux reducer tickets list is empty (meaning no tickets at all) than return statement to user
  if (Object.keys(ticketsList_dictionary).length === 0) {
    return <h3>No tickets available</h3>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th onClick={() => ticketSortByAlphabet("title")}>Title</th>
          <th onClick={() => ticketSortByPriority()}>Priority</th>
          <th onClick={() => ticketSortByAlphabet("status")}>Status</th>
          <th onClick={() => ticketSortByAlphabet("app_name")}>App name</th>
          {/* <th onClick={() => ticketSortByAlphabet("app_version")}>
            App version number
          </th> */}
          <th onClick={() => ticketSortByAlphabet("submitted_by")}>
            Submitted by
          </th>
          <th onClick={() => ticketSortByAlphabet("assigned_user")}>
            Assigned user
          </th>
          <th onClick={() => ticketSortByDate()}>Date Submitted</th>
        </tr>
      </thead>

      {/* list the tickets in sort option */}
      {tableBody()}
    </Table>
  );
}
