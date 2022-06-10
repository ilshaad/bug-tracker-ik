// display user assigned ticket lists in a table using react-bootstrap table
// In the table show: title / priority / status / app_name / app_version / submitted_by / created_on
// - not showing ticket_id / description / assigned_user
// the tickets will be listed by title ascending order first, & than user can choose to rearrange sort option if they wish to

import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import auth0User from "../helpers/auth0User";
import dateOnly from "../helpers/dateOnly";
import {
  sortNameByAscendingOrder_array,
  sortNameByDescendingOrder_array,
} from "../helpers/sortByAlphabet";
import {
  sortDateByNewestFirst_array,
  sortDateByOldestFirst_array,
} from "../helpers/sortByDate";
import {
  sortPriorityByAscendingOrder_array,
  sortPriorityByDescendingOrder_array,
} from "../helpers/sortByPriority";
import { ticket_type } from "../types/tickets_type";

type Props = {
  userSubmittedTickets_array: ticket_type[];
  auth0UserObject: any;
};

export default function DisplaySubmittedTicketsList_table({
  userSubmittedTickets_array,
  auth0UserObject,
}: Props) {
  const navigate = useNavigate();

  // set fold page to display ticket with title sort tickets first
  const titleSortFirst = sortNameByAscendingOrder_array(
    userSubmittedTickets_array,
    "title"
  );

  // use this ordered array ticket list for sorting when displaying on the table & user clicks on a sort option to readjust the sort option
  const [sortedTicketsListState, setSortedTicketsListState] =
    useState(titleSortFirst);

  // user can toggle with ascending & descending order of the ticket lists
  // starting off in descending order first
  const [ascendingOrder, setAscendingOrdered] = useState<boolean>(false);

  // space & ascending up arrow or descending down arrow for the sort option
  const ascendingArrowEntity = <>&nbsp;&#x002C6;</>;
  const descendingArrowEntity = <>&nbsp;&#x002C7;</>;

  const [currentSortOptionState, setCurrentSortOptionState] = useState("title");

  // indicate to user the current sort option by highlighting the sort option selected
  // it will change whenever user clicks on a different sort option
  let sortOptionSelectedClass = "sortOptionSelectedClass";

  // table row will have anchor link to view the ticket page
  const navigateToViewTicket = (ticketId: string) => {
    navigate(`/viewticket/${ticketId}`);
  };

  // sort tickets List by alphabetically
  const ticketSortByAlphabet = (ticketProperty: string) => {
    // highlight user the selected sort option they have clicked on
    setCurrentSortOptionState(ticketProperty);

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
    // highlight user the selected sort option they have clicked on
    setCurrentSortOptionState("priority");

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
    // highlight user the selected sort option they have clicked on
    setCurrentSortOptionState("created_on");

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
      // eg. 2021-06-01 11:08:01 =  2021-06-01
      const date = dateOnly({ dateTime: ticketObject.created_on });

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
          {/* <td>{ticketObject.submitted_by}</td> */}
          <td>{ticketObject.assigned_user}</td>
          <td>{date}</td>
        </tr>
      );
    }

    return <tbody>{tbodyTicketList_array}</tbody>;
  }; // END tableBody

  // if redux reducer tickets list is empty (meaning no tickets at all) than return statement to user
  // also if there is an error
  if (
    userSubmittedTickets_array.length === 0 ||
    !userSubmittedTickets_array ||
    auth0UserObject === null
  ) {
    return <h3>You have no submitted tickets</h3>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th
            onClick={() => ticketSortByAlphabet("title")}
            className={`tableTitles ${
              currentSortOptionState === "title" ? sortOptionSelectedClass : ""
            }`}
          >
            Title{ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
          <th
            onClick={() => ticketSortByPriority()}
            className={`tableTitles ${
              currentSortOptionState === "priority"
                ? sortOptionSelectedClass
                : ""
            }`}
          >
            Priority
            {ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
          <th
            onClick={() => ticketSortByAlphabet("status")}
            className={`tableTitles ${
              currentSortOptionState === "status" ? sortOptionSelectedClass : ""
            }`}
          >
            Status
            {ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
          <th
            onClick={() => ticketSortByAlphabet("app_name")}
            className={`tableTitles ${
              currentSortOptionState === "app_name"
                ? sortOptionSelectedClass
                : ""
            }`}
          >
            App name
            {ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
          {/* <th onClick={() => ticketSortByAlphabet("app_version")}>
            App version number
          </th> */}
          {/* <th onClick={() => ticketSortByAlphabet("submitted_by")}>
            Submitted by
          </th> */}
          <th
            onClick={() => ticketSortByAlphabet("assigned_user")}
            className={`tableTitles ${
              currentSortOptionState === "assigned_user"
                ? sortOptionSelectedClass
                : ""
            }`}
          >
            Assigned user
            {ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
          <th
            onClick={() => ticketSortByDate()}
            className={`tableTitles ${
              currentSortOptionState === "created_on"
                ? sortOptionSelectedClass
                : ""
            }`}
          >
            Date Submitted
            {ascendingOrder ? ascendingArrowEntity : descendingArrowEntity}
          </th>
        </tr>
      </thead>

      {/* list the tickets in sort option */}
      {tableBody()}
    </Table>
  );
}
