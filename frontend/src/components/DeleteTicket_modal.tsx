// delete modal will show the delete text form
// using react-bootstrap modal component
// only admin & submitted_user can delete ticket, noone else

import React from "react";
import { Button, Modal } from "react-bootstrap";

type Props = { showModal: boolean; closeModal_function: Function };

export default function DeleteTicket_modal({
  showModal,
  closeModal_function,
}: Props) {
  return (
    <Modal
      // show modal
      show={showModal}
      // hide modal when user click outside the modal box
      onHide={() => closeModal_function(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>iK delete title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>DeleteTicket_form</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeModal_function(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
