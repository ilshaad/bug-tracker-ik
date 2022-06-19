// button component which will only be un-disabled if you user is the submitted_by / assigned_user / admin user (from the auth0 user object) & allow only authorize user to delete the ticket
// delete button will display modal which should contain the delete form for the user

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import auth0User from "../scripts/auth0User";
import DeleteTicket_modal from "./DeleteTicket_modal";
import PopoverForButton from "./PopoverForButton";

type Props = { ticketSubmitted_by: string };

export default function DeleteTicket_button({ ticketSubmitted_by }: Props) {
  // for showing bootstrap modal which contains the edit form
  // used with the <EditTicket_modal/> which will show the edit form too
  const [modalShow, setModalShow] = useState(false);

  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const deleteButton = (enabledButton: boolean) => {
    if (enabledButton)
      return (
        <>
          <Button onClick={() => setModalShow(true)}>Delete ticket</Button>

          <DeleteTicket_modal
            showModal={modalShow}
            closeModal_function={setModalShow}
          />
        </>
      );

    return (
      <>
        <PopoverForButton
          position="top"
          textInfo="You must be the submitted user or assigned user to delete this ticket"
        >
          <Button style={{ opacity: "50%" }}>Delete ticket</Button>
        </PopoverForButton>
      </>
    );
  };

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  // return button if user is admin (you)
  if (auth0UserObject.email === adminEmail) return deleteButton(true);

  // return button if user nickname matches the ticket submitted_by name
  if (
    auth0UserObject.nickname?.toLowerCase() ===
    ticketSubmitted_by?.toLowerCase()
  )
    return deleteButton(true);

  // return null if all fails
  return deleteButton(false);
}
