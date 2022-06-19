// button component which will resovled or unresolved the status of the ticket by only submitted_by / assigned_user / admin user (from the auth0 user object)
// update ticket as resolved or pending status using redux update ticket action which will also update psql & the redux tickets store

import React from "react";
import { Button } from "react-bootstrap";
import auth0User from "../scripts/auth0User";
import { useAppDispatch } from "../models/hooks";
import { patch_updateTicket_actions } from "../models/reducers/tickets_slice";
import { ticket_type } from "../types/tickets_type";
import PopoverForButton from "./PopoverForButton";

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
          <>
            <Button onClick={updateTicketToPending}>
              Tag ticket as Pending
            </Button>
          </>
        );
      }
      // if not authorized, display disabled button
      else {
        return (
          <>
            <PopoverForButton
              position="bottom"
              textInfo="You must be the submitted user or assigned user to change the status of the ticket"
            >
              <Button style={{ opacity: "50%" }}>Tag ticket as Pending</Button>
            </PopoverForButton>
          </>
        );
      }
    }
    // if ticket status is 'Pending'
    else if (status === "Pending") {
      // if user submitted_by / assigned_user / admin, then give them the ability to update the ticket status to 'Resovled'
      if (authorised) {
        return (
          <>
            <Button onClick={updateTicketToResolved}>
              Tag ticket as Resolved
            </Button>
          </>
        );
      }
      // if not authorized display disabled button
      else {
        return (
          <>
            <PopoverForButton
              position="bottom"
              textInfo="You must be the submitted user or assigned user to change the status of the ticket"
            >
              <Button style={{ opacity: "50%" }}>Tag ticket as Resolved</Button>
            </PopoverForButton>
          </>
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

  if (ticketObject?.status === "Resolved") {
    // check if user is authorized, submitted_by / assigned_user / admin
    if (
      auth0UserObject?.nickname?.toLowerCase() ===
        ticketObject?.submitted_by?.toLowerCase() ||
      auth0UserObject?.nickname?.toLowerCase() ===
        ticketObject?.assigned_user?.toLowerCase() ||
      auth0UserObject?.email === adminEmail
    ) {
      return markAsResolvedOrPendingButton("Resolved", true);
    }
    // user is not authorized
    else {
      return markAsResolvedOrPendingButton("Resolved", false);
    }
  }
  // ticket is 'Pending status'
  else if (ticketObject?.status === "Pending") {
    // check if user is authroieszed, submitted_by / assigned_user / admin
    if (
      auth0UserObject?.nickname?.toLowerCase() ===
        ticketObject?.submitted_by?.toLowerCase() ||
      auth0UserObject?.nickname?.toLowerCase() ===
        ticketObject?.assigned_user?.toLowerCase() ||
      auth0UserObject?.email === adminEmail
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
