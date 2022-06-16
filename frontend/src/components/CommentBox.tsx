import React, { useState } from "react";
import { Container } from "react-bootstrap";
import auth0User from "../helpers/auth0User";
import { comment_type } from "../types/comments_type";
import DeleteComment_button from "./DeleteComment_button";
import EditComment_button from "./EditComment_button";
import EditComment_textarea from "./EditComment_textarea";

type Props = { commentObject: comment_type };

export default function CommentBox({ commentObject }: Props) {
  const { comment_id, ticket_id, name, email, text_comment, created_on } =
    commentObject;

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  // display the edit textarea box
  const [displayEditCommentBox, setDisplayEditCommentBox] =
    useState<boolean>(false);

  // display the DeleteComment_button component only if the edit textarea is not open, otherwise hide the component until user is finish editing their comment
  const diplayDeleteCommentButtonComponent = () => {
    // if edit comment box textarea form is open & user is editing their comment, than return null
    if (displayEditCommentBox) {
      return null;
    }
    // if edit comment box textarea is currently close than return the delete comment button
    return (
      <DeleteComment_button
        auth0UserObject={auth0UserObject}
        commentEmail={email}
        commentId={comment_id}
      />
    );
  }; //END diplayDeleteCommentButtonComponent

  return (
    <Container className="border-top border-2 border-primary mx-auto mb-2">
      <h3 className="mt-2 mb-2 text-secondary">{name}</h3>
      <h4 className="mt-1 mb-2">{email}</h4>
      <p className="mt-1 mb-2">{text_comment}</p>
      <time dateTime={created_on} className="fst-italic">
        {created_on}
      </time>

      <div className="d-flex justify-content-end gap-2 mt-1">
        {/* Edit button to to open the edit textarea for user to update comment */}
        <EditComment_button
          displayEditCommentBox={displayEditCommentBox}
          setDisplayEditCommentBox={setDisplayEditCommentBox}
          auth0UserObject={auth0UserObject}
          commentEmail={email}
        />

        {/* delete button only presented to user or admin & will open confirmation modal to user for deletion of comment */}
        {diplayDeleteCommentButtonComponent()}
      </div>

      {/* User can update their comment with this textarea form when they click on the edit button*/}
      <EditComment_textarea
        displayEditCommentBox={displayEditCommentBox}
        setDisplayEditCommentBox={setDisplayEditCommentBox}
        commentObject={commentObject}
      />
    </Container>
  );
}
