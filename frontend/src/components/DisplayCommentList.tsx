import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  sortDateByNewestFirst_array,
  sortDateByOldestFirst_array,
} from "../helpers/sortByDate";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments_slice";
import { comment_type } from "../types/comments_type";
import CommentBox from "./CommentBox";

type Props = { ticketId: string; newestCommentFirst_state: boolean };

export default function DisplayCommentList({
  ticketId,
  newestCommentFirst_state,
}: Props) {
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
    return (
      <Col
        xs={{ span: 10, offset: 1 }}
        className="border-top border-2 border-primary mt-1 mx-auto"
      >
        <p className="fs-5">No comments</p>
      </Col>
    );
  }

  // new jsx array with the sorted date array with newest or oldest first
  const sortedComments_array: Array<JSX.Element> = [];

  // if newestCommentFirst_state is true (meaning user chose newest option in the select form. Also newest is the default value too)
  if (newestCommentFirst_state) {
    // sort out date using the sortDateByNewestFirst_arry helper function
    const newestDateFirst_array = sortDateByNewestFirst_array(comments_array);

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

      // return array of newest comment first
      sortedComments_array.push(
        <CommentBox
          key={commentObject.comment_id}
          commentObject={commentObject}
        />
      );
    }
  } //END newestCommentFirst_state if statement
  // if newestCommentFirst_state is false than oldest date option is selected by the user
  else if (!newestCommentFirst_state) {
    // sort out date using the sortDateByOldestFirst_array helper function
    const oldestDateFirst_array = sortDateByOldestFirst_array(comments_array);

    // create each jsx comment box individually
    for (let comment of oldestDateFirst_array) {
      const commentObject: comment_type = {
        comment_id: comment.comment_id,
        text_comment: comment.text_comment,
        created_on: comment.created_on,
        ticket_id: comment.ticket_id,
        name: comment.name,
        email: comment.email,
      };

      // return array of oldest comment first
      sortedComments_array.push(
        <CommentBox
          key={commentObject.comment_id}
          commentObject={commentObject}
        />
      );
    }
  }

  return (
    <Col xs={12} lg={{ span: 10, offset: 1 }} className="mt-1">
      {sortedComments_array}
    </Col>
  );
}
