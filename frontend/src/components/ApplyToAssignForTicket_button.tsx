// button component which will only be un-disabled  if you user is NOT the submitted_by / assigned_user user (from the auth0 user object) & user will apply to assign for the ticket
// VIP however this is just a dummy button because I did not set up the SS psql (& etc) for applying to assign ticket & submitted_by (& admin) user to review & accept or decline assign user for the ticket
// - so we will just return a toast message to user that their request to assign has been sent to the submitted_by user & will soon confirm if they are accepted or decline as assigned_user for the ticket
//    - disable button after click

import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import auth0User from "../helpers/auth0User";
import { useAppDispatch } from "../models/hooks";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import PopoverForButton from "./PopoverForButton";

type Props = { ticketSubmitted_by: string; ticketAssigned_user: string };

export default function ApplyToAssignForTicket_button({
  ticketSubmitted_by,
  ticketAssigned_user,
}: Props) {
  const dispatch = useAppDispatch();

  const buttonEnabled = useRef<HTMLButtonElement>(null);

  const adminEmail = process.env.ADMIN_EMAIL;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  // when user clicks on the ApplyToAssignForTicket_button, disable the button & display a toast message that the user will be reviewed by the submitted_by user to confirm if they will be assign for the ticket
  const disableTheEnabledButton = () => {
    // disable the button
    buttonEnabled.current?.setAttribute("disabled", "disabled");

    // Toast message the user that they are now considered to be assigned for the ticket by the submitted_user
    dispatch(
      messageToast_actions(
        `We have sent a notification to the submitted user that you wish to be assign for the ticket. You will be notified when submitted user has confirmed you are assigned for the ticket`
      )
    );
  };

  const ApplyToAssignedButton = (enabledButton: boolean) => {
    if (enabledButton)
      return (
        <>
          <Button
            type="button"
            ref={buttonEnabled}
            onClick={disableTheEnabledButton}
          >
            Apply for assignee
          </Button>
        </>
      );

    return (
      <>
        <PopoverForButton
          position="bottom"
          textInfo="Unable to assign for the ticket"
        >
          <Button style={{ opacity: "50%" }}>Apply for assignee</Button>
        </PopoverForButton>
      </>
    );
  };

  // while loading or user not logged in
  if (auth0UserObject === null) return null;

  // return button if user is admin (you)
  if (auth0UserObject.email === adminEmail) return ApplyToAssignedButton(true);

  // return enabled button if user nickname does not matches the ticket submitted_by or assigned_user name
  if (
    auth0UserObject.nickname?.toLowerCase() !==
      ticketSubmitted_by?.toLowerCase() &&
    auth0UserObject.nickname?.toLowerCase() !==
      ticketAssigned_user?.toLowerCase()
  )
    return ApplyToAssignedButton(true);

  // return null if all fails
  return ApplyToAssignedButton(false);
}
