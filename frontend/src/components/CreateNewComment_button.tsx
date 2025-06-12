// button to open create a new comment textarea
// only user & admin can create comment

import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  showCreateCommentBox: boolean;
  setShowCreateCommentBox: Function;
  auth0UserObject: any;
};

export default function CreateNewComment_button({
  showCreateCommentBox,
  setShowCreateCommentBox,
  auth0UserObject,
}: Props) {
  let userObject = auth0UserObject;

  const adminEmail = process.env.ADMIN_EMAIL;

  // return create comment button for the user & admin if state showCreateCommentBox is false which is the comment text area for creating a new comment
  const createNewCommentButton = () => {
    if (!showCreateCommentBox) {
      // if user or is admin then return button
      if (userObject || adminEmail === userObject?.email) {
        // when user clicks on button, hide button & show the comment text area for add new comment
        return (
          <Button
            onClick={() => setShowCreateCommentBox(!showCreateCommentBox)}
            size="sm"
            style={{ backgroundColor: "var(--bs-primary)" }}
          >
            Add comment
          </Button>
        );
      }
      return null;
    }

    return null;
  };

  return <div>{createNewCommentButton()}</div>;
}
