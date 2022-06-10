// button component which will only be un-disabled if you user is the submitted_by / assigned_user / admin user (from the auth0 user object) & allow only authorize user to edit the ticket
// edit button will display the edit modal & should have the edit form the user will need to fill out

import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import auth0User from "../helpers/auth0User";
import EditTicket_modal from "./EditTicket_modal";
import PopoverForButton from "./PopoverForButton";

type Props = { ticketSubmitted_by: string; ticketAssigned_user: string };

export default function EditTicket_button({
  ticketSubmitted_by,
  ticketAssigned_user,
}: Props) {
  // for showing bootstrap modal which contains the edit form
  // used with the <EditTicket_modal/> which will show the edit form too
  const [modalShow, setModalShow] = useState(false);

  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const editButton = (enabledButton: boolean) => {
    // show modal for edit form
    if (enabledButton)
      return (
        <Col xs={12} className="d-grid">
          <Button onClick={() => setModalShow(true)}>Update ticket</Button>

          <EditTicket_modal
            showModal={modalShow}
            // closeModal_function={() => setModalShow(false)}
            closeModal_function={setModalShow}
          />
        </Col>
      );

    return (
      <Col xs={12} className="d-grid">
        <PopoverForButton
          position="bottom"
          textInfo="You must be the submitted user or assigned user to edit this ticket"
        >
          <Button style={{ opacity: "50%" }}>Update ticket</Button>
        </PopoverForButton>
      </Col>
    );
  };

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  // return button if user is admin (you)
  if (auth0UserObject.email === adminEmail) return editButton(true);

  // return button if user nickname matches the ticket submitted_by or assigned_user name
  if (
    auth0UserObject.nickname?.toLowerCase() ===
      ticketSubmitted_by?.toLowerCase() ||
    auth0UserObject.nickname?.toLowerCase() ===
      ticketAssigned_user?.toLowerCase()
  )
    return editButton(true);

  // return null if all fails
  return editButton(false);
}
