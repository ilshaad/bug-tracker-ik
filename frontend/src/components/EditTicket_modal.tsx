import React, { MouseEventHandler, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  showModal: boolean;
  closeModal(): void;
};

export default function EditTicket_modal({ showModal, closeModal }: Props) {
  return (
    <Modal
      // show modal
      show={showModal}
      // hide modal when user click outside the modal box
      onHide={closeModal}
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
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
