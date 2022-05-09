// button component which will resovled or unresolved the status of the ticket by only submitted_by / assigned_user / admin user (from the auth0 user object)
// update ticket as resolved or pending status using redux update ticket action which will also update psql & the redux tickets store

import React from "react";
import auth0User from "../helpers/auth0User";
import { ticket_type } from "../@types/tickets_type";
import { useAppDispatch } from "../models/hooks";
import { patch_updateTicket_actions } from "../models/reducers/tickets_slice";

type Props = {
  ticketObject: ticket_type;
};

export default function MarkAsResolvedOrPending_button({
  ticketObject,
}: Props) {
  const dispatch = useAppDispatch();

  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  // update ticket status to resolved by authorized user
  const updateTicketToResolved = () => {
    dispatch(
      patch_updateTicket_actions({ ...ticketObject, status: "Resolved" })
    );
  };

  // update ticket status to pending by authorized user
  const updateTicketToPending = () => {
    dispatch(
      patch_updateTicket_actions({ ...ticketObject, status: "Pending" })
    );
  };

  // button jsx to display depending on ticket status & if user is authorized
  const markAsResolvedOrPendingButton = (
    status: string,
    authorised: boolean
  ) => {
    if (status === "Resolved") {
      // is user submitted_by / assigned_user / admin, then give them the ability to update the ticket status to 'Pending'
      if (authorised) {
        return (
          <button onClick={updateTicketToPending}>
            Pending MarkAsResolvedOrPending_button
          </button>
        );
      }
      // if not authorized, display disabled button
      else {
        return <button disabled>Pending MarkAsResolvedOrPending_button</button>;
      }
    }
    // if ticket status is 'Pending'
    else if (status === "Pending") {
      // if user submitted_by / assigned_user / admin, then give them the ability to update the ticket status to 'Resovled'
      if (authorised) {
        return (
          <button onClick={updateTicketToResolved}>
            Resolved MarkAsResolvedOrPending_button
          </button>
        );
      }
      // if not authorized display disabled button
      else {
        return (
          <button disabled>Resolved MarkAsResolvedOrPending_button</button>
        );
      }
    }
    // if all else fail return null
    else {
      return null;
    }
  }; //END markAsResolvedOrPendingButton method function

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  if (ticketObject.status === "Resolved") {
    // check if user is authorized, submitted_by / assigned_user / admin
    if (
      auth0UserObject.nickname === ticketObject.submitted_by ||
      auth0UserObject.nickname === ticketObject.assigned_user ||
      auth0UserObject.email === adminEmail
    ) {
      return markAsResolvedOrPendingButton("Resolved", true);
    }
    // user is not authorized
    else {
      return markAsResolvedOrPendingButton("Resolved", false);
    }
  }
  // ticket is 'Pending status'
  else if (ticketObject.status === "Pending") {
    // check if user is authroieszed, submitted_by / assigned_user / admin
    if (
      auth0UserObject.nickname === ticketObject.submitted_by ||
      auth0UserObject.nickname === ticketObject.assigned_user ||
      auth0UserObject.email === adminEmail
    ) {
      return markAsResolvedOrPendingButton("Pending", true);
    }
    // user is not authorized
    else {
      return markAsResolvedOrPendingButton("Pending", false);
    }
  }

  // if all else fails
  return null;
}
