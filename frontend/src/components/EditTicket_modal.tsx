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
        <Button onClick={() => closeModal_function(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
