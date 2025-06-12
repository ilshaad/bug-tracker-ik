// display delete button to open delete comment confirmation modal for user (& admin) to delete comment
// - only for user & admin
//  - the comment must belong to user for them to be able to delete the comment

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteCommentConfirmation_modal from "./DeleteCommentConfirmation_modal";

type Props = {
  auth0UserObject: any;
  commentEmail: string;
  commentId: string;
};

export default function DeleteComment_button({
  auth0UserObject,
  commentEmail,
  commentId,
}: Props) {
  const userObject = auth0UserObject;
  const adminEmail = process.env.ADMIN_EMAIL;

  // boolean state for displaying the delete comment confirmation modal to the user
  const [
    displayDeleteCommentConfirmation_modal,
    setDisplayDeleteCommentConfirmation_modal,
  ] = useState<boolean>(false);

  // delete button jsx
  const deleteButton = () => (
    <Button
      onClick={() => setDisplayDeleteCommentConfirmation_modal(true)}
      size="sm"
      style={{ backgroundColor: "var(--bs-primary)" }}
    >
      Delete comment
    </Button>
  ); //END deletebutton

  // if delete comment confirmation modal state is false than check comment belongs to user or user is admin & return the delete button
  if (!displayDeleteCommentConfirmation_modal) {
    // check if comment belongs to user
    if (commentEmail === userObject.email) return deleteButton();

    // Or check if user is admin
    if (adminEmail === auth0UserObject.email) return deleteButton();

    // everything else return null
    return null;
  }
  // if delete comment confirmation modal is true then return the react-bootstrap modal component
  else if (displayDeleteCommentConfirmation_modal) {
    return (
      <DeleteCommentConfirmation_modal
        displayDeleteCommentConfirmation_modal={
          displayDeleteCommentConfirmation_modal
        }
        setDisplayDeleteCommentConfirmation_modal={
          setDisplayDeleteCommentConfirmation_modal
        }
        commentId={commentId}
      />
    );
  }

  // null for everything else
  return null;
}
