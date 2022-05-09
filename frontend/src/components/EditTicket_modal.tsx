import React, { MouseEventHandler, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  hide: MouseEventHandler;
  setFalse: Function;
};

export default function EditTicket_modal({ show, hide, setFalse }: Props) {
  return (
    <Modal
      show={show}
      // TODO I CANNOT GET BACKGROUND SCREEN TO CLOSE MODAL
      onHide={setFalse}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
