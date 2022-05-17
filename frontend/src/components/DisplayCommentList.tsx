import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { sortDateByOldestFirst_array } from "../helpers/sortByDate";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments_slice";
import { ticket_type } from "../types/tickets_type";

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
    return <h4>There are no comments for this ticket</h4>;
  }

  // sort out date using the sortDateByOldestFirst_array helper function
  const oldestDateFirst_array = sortDateByOldestFirst_array(comments_array);

  // new jsx array with the sorted date array
  const sortedOldestComments_Array = [];

  for (let comment of oldestDateFirst_array) {
    sortedOldestComments_Array.push(
      <li key={comment.text_comment}>
        <h4>{comment.name}</h4>
        <p>{comment.email}</p>
        <h5>{comment.text_comment}</h5>
        <i>{comment.created_on}</i>
      </li>
    );
  }

  return <ul>{sortedOldestComments_Array}</ul>;
}
