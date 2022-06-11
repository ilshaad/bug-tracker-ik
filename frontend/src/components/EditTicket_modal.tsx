import React, { useEffect } from "react";
import { Button, Container, Modal } from "react-bootstrap";
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
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fs-1 fw-bold text-primary"
        >
          <Container>Update ticket</Container>
        </Modal.Title>
      </Modal.Header>

      {/* <Modal.Body>
        <h4>EditTicket_form</h4>

        <EditTicket_form closeModal_function={closeModal_function} />
      </Modal.Body> */}

      {/* Moved the <Modal.Body> & <Modal.Footer> within the form component because I want to keep the Modal structure as siblings which will remain align */}
      <EditTicket_form closeModal_function={closeModal_function} />

      {/* <Modal.Footer>
        <Button type="submit" onClick={() => console.log(111)}>
          iK submit button
        </Button>
        <Button onClick={() => closeModal_function(false)}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
