import React, { useState } from "react";
import { Row } from "react-bootstrap";
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

  return (
    <Row className="border">
      <h4>{name}</h4>
      <p>{email}</p>
      <h5>{text_comment}</h5>
      <i>{created_on}</i>

      {/* Edit button to to open the edit textarea for user to update comment */}
      <EditComment_button
        displayEditCommentBox={displayEditCommentBox}
        setDisplayEditCommentBox={setDisplayEditCommentBox}
        auth0UserObject={auth0UserObject}
        commentEmail={email}
      />

      {/* User can update their comment with this textarea form when they click on the edit button*/}
      <EditComment_textarea
        displayEditCommentBox={displayEditCommentBox}
        setDisplayEditCommentBox={setDisplayEditCommentBox}
        commentObject={commentObject}
      />

      {/* delete button only presented to user or admin & will open confirmation modal to user for deletion of comment */}
      <DeleteComment_button
        auth0UserObject={auth0UserObject}
        commentEmail={email}
        commentId={comment_id}
      />
    </Row>
  );
}
