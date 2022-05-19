// delete modal will show a confirmation modal to the user & ask if they are sure they want to delete their comment
// using react-bootstrap modal component
// only if user owns the comment or is admin can delete comments

import React from "react";
import { Button, Modal } from "react-bootstrap";
import DeleteTicket_form from "./DeleteTicket_form";

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

      <DeleteTicket_form closeModal_function={closeModal_function} />
      {/* <Modal.Body>
        <h4>DeleteTicket_form</h4>

        <DeleteTicket_form />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => closeModal_function(false)}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
