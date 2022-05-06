// button component which will only be un-disabled if you user is the submitted_by / assigned_user / admin user & not already resolved (from the auth0 user object) & allow only authorize user to mark ticket as resolved
// ticket must not be resolved to be un-disabled button
// update ticket as resolved using redux update ticket action which will also update psql & the redux tickets store

import React from "react";
import auth0User from "../helpers/auth0User";
import { ticket_type } from "../@types/tickets_type";

type Props = {
  ticketObject: ticket_type;
};

export default function MarkAsResolved_button({ ticketObject }: Props) {
  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const updateTicketToResolved = () => {
    // TODO use patch_updateTicket_acitons to resolved ticket status
    // zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
  };

  const MarkAsResolvedButton = (enabledButton: boolean) => {
    if (enabledButton)
      return (
        <button onClick={updateTicketToResolved}>
          Enabled MarkAsResolved_button
        </button>
      );

    return <button disabled>Disable MarkAsResolved_button</button>;
  };

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  if (ticketObject.status === "Resolved") return MarkAsResolvedButton(false);

  // return button if user is admin (you)
  if (auth0UserObject.email === adminEmail) return MarkAsResolvedButton(true);

  // return button if user nickname matches the ticket submitted_by or assigned_user name
  if (
    auth0UserObject.nickname === ticketObject.submitted_by ||
    auth0UserObject.nickname === ticketObject.assigned_user
  )
    return MarkAsResolvedButton(true);

  // return null if all fails
  return MarkAsResolvedButton(false);
}
