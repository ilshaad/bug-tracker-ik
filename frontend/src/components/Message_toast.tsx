// reusable message toast that will pop up at the bottom end of the screen & display the message for 4 seconds
// using react-bootstrap to create the component toast
// eg. when user creates a ticket, they will be navigated to the dashboard & the toast message will confirm if they succeeded or failed to create a new ticket
// VIP this toast component will trigger when you dispatch the messageToast_actions() action creator

import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { nullTheMessageToast_actions } from "../models/reducers/messageToast_slice";

type Props = {};

export default function Message_toast({}: Props) {
  const dispatch = useAppDispatch();
  const messageToast = useAppSelector((state) => state.messageToasts.message);

  const messageToast_reduxAction = () => {
    return messageToast ? true : false;
  };
  const nullTheMessageToast_reduxAction = () => {
    dispatch(nullTheMessageToast_actions());
  };

  return (
    <ToastContainer
      className="p-3"
      style={{ position: "fixed", bottom: 0, right: 0 }}
    >
      <Toast
        show={messageToast_reduxAction()}
        onClose={nullTheMessageToast_reduxAction}
        delay={4000}
        autohide
      >
        <Toast.Header className="bg-primary">
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
          <strong className="me-auto text-light">Bug Tracker</strong>
          <small className="text-light">0 mins ago</small>
        </Toast.Header>
        <Toast.Body>{messageToast}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

/** eg. using button to dispatch the redux action messageToast_actions() which will trigger the Message_toast component for 4 seconds

<Button
  onClick={() => dispatch(messageToast_actions("messaging whatever"))}
  className="mb-2"
>
  Toggle Toast <strong>with</strong> Animation
</Button>

<Message_toast/>

 */
