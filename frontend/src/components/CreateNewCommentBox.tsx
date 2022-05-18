import React from "react";
import CreateNewCommentBox_textarea from "./CreateNewCommentBox_textarea";

type Props = {
  showCreateCommentBox: boolean;
  setShowCreateCommentBox: Function;
  auth0UserObject: any;
};

export default function CreateNewCommentBox({
  showCreateCommentBox,
  setShowCreateCommentBox,
  auth0UserObject,
}: Props) {
  if (showCreateCommentBox) {
    return (
      <div>
        <h4>create a comment</h4>
        {/* CreateNewCommentBox_textarea */}
        <CreateNewCommentBox_textarea
          setShowCreateCommentBox={setShowCreateCommentBox}
          auth0UserObject={auth0UserObject}
        />
        <button>add comment</button>
        <button>cancel</button>
      </div>
    );
  }

  return null;
}
