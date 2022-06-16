// display edit button to open textarea commentbox for user to update
// - only for user & admin
//  - the comment must belong to user for them to be able to edit the comment

import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  displayEditCommentBox: boolean;
  setDisplayEditCommentBox: Function;
  auth0UserObject: any;
  commentEmail: string;
};

export default function EditComment_button({
  displayEditCommentBox,
  setDisplayEditCommentBox,
  auth0UserObject,
  commentEmail,
}: Props) {
  const userObject = auth0UserObject;
  const adminEmail = process.env.ADMIN_EMAIL;

  const editButton = () => (
    <Button onClick={() => setDisplayEditCommentBox(true)} size="sm">
      Edit comment
    </Button>
  ); //END editbutton

  // if edit comment textarea is not open than check comment belongs to user or user is admin
  if (!displayEditCommentBox) {
    // check if comment belongs to user
    if (commentEmail === userObject.email) return editButton();

    // Or check if user is admin
    if (adminEmail === auth0UserObject.email) return editButton();

    // everything else return null
    return null;
  }

  // null if edit textarea is currently showing
  return null;
}
