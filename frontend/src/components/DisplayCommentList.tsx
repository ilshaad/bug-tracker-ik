import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  sortDateByNewestFirst_array,
  sortDateByOldestFirst_array,
} from "../helpers/sortByDate";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments_slice";
import { comment_type } from "../types/comments_type";
import { ticket_type } from "../types/tickets_type";
import CommentBox from "./CommentBox";

type Props = { ticketId: string };

export default function DisplayCommentList({ ticketId }: Props) {
  const dispatch = useAppDispatch();

  const comments_array = useAppSelector((state) => state.comments);

  useEffect(() => {
    // collect all comments for the ticket. if there is no comments it will reset comments to initial comment state
    dispatch(get_allCommentsForASingleTicket_actions(ticketId));
  }, []);

  // if ticket does not exist, do not fetch comment
  if (!ticketId) return null;

  // if there is 0 items in the array, than no one has written comments for this ticket
  if (comments_array.length === 0) {
    return <Row className="border">There are no comments for this ticket</Row>;
  }

  // sort out date using the sortDateByNewestFirst_arry helper function
  const newestDateFirst_array = sortDateByNewestFirst_array(comments_array);

  // new jsx array with the sorted date array with newest first
  const sortedNewestComments_array: Array<JSX.Element> = [];

  // create each jsx comment box individually
  for (let comment of newestDateFirst_array) {
    const commentObject: comment_type = {
      comment_id: comment.comment_id,
      text_comment: comment.text_comment,
      created_on: comment.created_on,
      ticket_id: comment.ticket_id,
      name: comment.name,
      email: comment.email,
    };

    sortedNewestComments_array.push(
      <CommentBox
        key={commentObject.comment_id}
        commentObject={commentObject}
      />
    );
  }

  return <Container>{sortedNewestComments_array}</Container>;
}
