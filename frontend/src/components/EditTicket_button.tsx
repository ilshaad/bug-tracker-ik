// button component which will only be un-disabled if you user is the submitted_by / assigned_user / admin user (from the auth0 user object) & allow only authorize user to edit the ticket

import React from "react";
import auth0User from "../helpers/auth0User";

type Props = { ticketSubmitted_by: string; ticketAssigned_user: string };

export default function EditTicket_button({
  ticketSubmitted_by,
  ticketAssigned_user,
}: Props) {
  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const editButton = (enabledButton: boolean) => {
    if (enabledButton) return <button>Enabled EditTicket_button</button>;

    return <button disabled>Disable EditTicket_buttons</button>;
  };

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  // return button if user is admin (you)
  if (auth0UserObject.email === adminEmail) return editButton(true);

  // return button if user nickname matches the ticket submitted_by or assigned_user name
  if (
    auth0UserObject.nickname === ticketSubmitted_by ||
    auth0UserObject.nickname === ticketAssigned_user
  )
    return editButton(true);

  // return null if all fails
  return editButton(false);
}
