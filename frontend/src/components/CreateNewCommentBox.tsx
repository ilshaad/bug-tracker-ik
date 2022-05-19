import React from "react";
import CreateNewCommentBox_textarea from "./CreateNewCommentBox_textarea";

type Props = {
  showCreateCommentBox: boolean;
  setShowCreateCommentBox: Function;
  auth0UserObject: any;
  ticket_id: string;
};

export default function CreateNewCommentBox({
  showCreateCommentBox,
  setShowCreateCommentBox,
  auth0UserObject,
  ticket_id,
}: Props) {
  if (showCreateCommentBox) {
    return (
      <div>
        <h4>create a comment</h4>
        {/* CreateNewCommentBox_textarea */}
        <CreateNewCommentBox_textarea
          setShowCreateCommentBox={setShowCreateCommentBox}
          auth0UserObject={auth0UserObject}
          ticket_id={ticket_id}
        />
      </div>
    );
  }

  return null;
}
