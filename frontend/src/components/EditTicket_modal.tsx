import React from "react";
import { Button, Modal } from "react-bootstrap";
import EditTicket_form from "./EditTicket_form";

type Props = {
  showModal: boolean;
  closeModal_function: Function;
};

export default function EditTicket_modal({
  showModal,
  closeModal_function,
}: Props) {
  // I created this method function because I still want to use <Modal.Footer> structrue but need to trigger the submit event so that the form can be be submitted when user clisks on it
  const dispatchSubmitButtonInForm = () => {
    console.log("iKdispatch submit");

    const triggerDeleteFormSubmitEvent = new Event(
      "triggerDeleteFormSubmitEvent",
      { bubbles: false }
    );

    dispatchEvent(triggerDeleteFormSubmitEvent);
  };

  return (
    <Modal
      // show modal
      show={showModal}
      // hide modal when user click outside the modal box
      onHide={() => closeModal_function(false)}
      size="lg"
      // ! iK comeback to this aria & see if you want to adjust this
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>EditTicket_form</h4>

        <EditTicket_form closeModal_function={closeModal_function} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={dispatchSubmitButtonInForm}>iK submit button</Button>
        <Button onClick={() => closeModal_function(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
