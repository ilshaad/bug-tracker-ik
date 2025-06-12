// delete modal will show a confirmation modal to the user & ask if they are sure they want to delete their comment
// using react-bootstrap modal component
// only if user owns the comment or is admin can delete comments
//  - use of action creator to delete comment

import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import catchHandlerForReduxSlices from "../scripts/catchHandlerForReduxSlices";
import { useAppDispatch } from "../models/hooks";
import { delete_deleteComment_actions } from "../models/reducers/comments_slice";
import { messageToast_actions } from "../models/reducers/messageToast_slice";

type Props = {
  displayDeleteCommentConfirmation_modal: boolean;
  setDisplayDeleteCommentConfirmation_modal: Function;
  commentId: string;
};

export default function DeleteCommentConfirmation_modal({
  displayDeleteCommentConfirmation_modal,
  setDisplayDeleteCommentConfirmation_modal,
  commentId,
}: Props) {
  const dispatch = useAppDispatch();

  const deleteComment = () => {
    // close modal
    setDisplayDeleteCommentConfirmation_modal(false);

    // delete comment through action creator
    dispatch(delete_deleteComment_actions(commentId))
      .then((res) => {
        // If ss psql failed to delete comment
        if (res.type === "delete/deleteComment/rejected") {
          // toast message to user it failed
          dispatch(
            messageToast_actions(
              "Unfortunately your comment was not deleted. Please refresh the page and try again!"
            )
          );

          // output error on console
          catchHandlerForReduxSlices(
            "delete_deleteComment_actions thenable handler",
            "DeleteCommentConfirmation_modal.tsx",
            res
          );
        } //END delete/deleteComment/rejected

        // if ss psql succeeded in deleting the comment
        if (res.type === "delete/deleteComment/fulfilled") {
          // toast message to user it succeeded
          dispatch(messageToast_actions("Comment deleted!"));
        }
      }) //END thenable handler for delete_deleteComment_actions
      .catch((error) => {
        // toast message to user it failed
        dispatch(
          messageToast_actions(
            "Unfortunately your comment was not deleted. Please refresh the page and try again!"
          )
        );

        // output error on console
        catchHandlerForReduxSlices(
          "delete_deleteComment_action catch handler",
          "DeleteCommentConfirmation_modal.tsx",
          error
        );
      }); //END catch handler for delete_deleteComment_actions
  }; //END deleteComment method function

  return (
    <Modal
      // show modal
      show={displayDeleteCommentConfirmation_modal}
      // hide modal when user click outside the modal box
      onHide={() => setDisplayDeleteCommentConfirmation_modal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-1 fw-bold text-primary">
          Delete comment
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <p>Are you sure you want to delete comment?</p>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={deleteComment}
          style={{ backgroundColor: "var(--bs-primary)" }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => setDisplayDeleteCommentConfirmation_modal(false)}
          style={{ backgroundColor: "var(--bs-danger)" }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
