// display delete button to open textarea commentbox for user to delete
// - only for user & admin
//  - the comment must belong to user for them to be able to delete the comment

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../models/hooks";
import { delete_deleteComment_actions } from "../models/reducers/comments_slice";

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
  const dispatch = useAppDispatch();

  const userObject = auth0UserObject;
  const adminEmail = process.env.ADMIN_EMAIL;

  // display the delete form textbox
  const [displayDeleteConfirmation_modal, setDisplayDeleteConfirmation_modal] =
    useState<boolean>(false);

  // onClick event for the delete button
  const onDeleteButton = () => {
    console.log("onDeleteButton");
    // dispatch(delete_deleteComment_actions(commentId))
    //   .then((res) => {
    //     console.log(res);

    //     // if deleted is rejected
    //     if (res.type === "delete/deleteComment/rejected") {
    //       // TODO
    //     }
    //   }) //END thenable handler delete_deleteComment_actions
    //   .catch((error) => {
    //     console.log(error);
    // }); //END catch handler delete_deleteComment_actions
  }; //END onDeleteButton

  // delete button jsx
  const deleteButton = () => (
    <div>
      <Button onClick={onDeleteButton}>ENABLED delete comment</Button>
    </div>
  ); //END deletebutton

  // if delete comment textarea is not open than check comment belongs to user or user is admin
  if (!displayDeleteConfirmation_modal) {
    // check if comment belongs to user
    if (commentEmail === userObject.email) return deleteButton();

    // Or check if user is admin
    if (adminEmail === auth0UserObject.email) return deleteButton();

    // everything else return null
    return null;
  }

  // null if delete textarea is currently showing
  return null;
}
