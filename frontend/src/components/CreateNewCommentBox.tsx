import React from "react";
import { Col } from "react-bootstrap";
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
      <Col>
        <h4 className="mb-1">Add comment</h4>
        {/* CreateNewCommentBox_textarea */}
        <CreateNewCommentBox_textarea
          setShowCreateCommentBox={setShowCreateCommentBox}
          auth0UserObject={auth0UserObject}
          ticket_id={ticket_id}
        />
      </Col>
    );
  }

  return null;
}
