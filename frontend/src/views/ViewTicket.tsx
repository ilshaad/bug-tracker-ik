import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { sortDateByOldestFirst_array } from "../helpers/sortByDate";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments/commentsSlice";

export default function ViewTicket(): JSX.Element | null {
  const ticketId_Params = useParams().ticketid;

  const dispatch = useAppDispatch();
  const ticket = useAppSelector((state) => state.tickets[ticketId_Params!]);
  const comments = useAppSelector((state) => state.comments);

  useEffect(() => {
    // collect all comments for the ticket. if there is no comments it will reset comments to initial comment state
    dispatch(get_allCommentsForASingleTicket_actions(ticketId_Params!));
  }, []);

  const displayTicket = () => {
    // if ticket does not exist, redirect user to login/dashboard page
    if (!ticket) {
      return <Navigate to={"/"} />;
    }

    return (
      <>
        <h1>ViewTicket:ticketid PAGE</h1>
        <h2>title: {ticket.title}</h2>
        <code>description: {ticket.description}</code>
        <p>priority: {ticket.priority}</p>
        <p>assigned_user: {ticket.assigned_user}</p>
        <p>status: {ticket.status}</p>
        <p>app_name: {ticket.app_name}</p>
        <p>app_version: {ticket.app_version}</p>
        <h4>admin only changes</h4>
        <p>submitted_by: {ticket.submitted_by}</p>
        <p>created_on: {ticket.created_on}</p>
      </>
    );
  };

  const displayComments = () => {
    // if ticket does not exist, do not fetch comment
    if (!ticket) return null;

    // if there is 0 items in the array, than no one has written comments for this ticket
    if (comments.length === 0) {
      return <h4>There are no comments for this ticket</h4>;
    }

    console.log(55);
    console.log(comments);

    // TODO sort out the asc  & dec (aka newest & oldest). Maybe think about creating sort function for date
    const oldestDateFirst_array = sortDateByOldestFirst_array(comments);
    console.log(
      "🚀 ~ file: ViewTicket.tsx ~ line 69 ~ displayComments ~ sortDateByOldestFirst_array",
      oldestDateFirst_array
    );

    const sortedOldestComments_Array = [];

    for (let comment of oldestDateFirst_array) {
      sortedOldestComments_Array.push(
        <li>
          <h4>{comment.name}</h4>
          <p>{comment.email}</p>
          <h5>{comment.text_comment}</h5>
          <i>{comment.created_on}</i>
        </li>
      );
    }

    return <ul>{sortedOldestComments_Array}</ul>;
  };

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from view ticket"
        metaDescriptionContent="mDescContent-view ticket"
        metaKeywordsContent="view ticket & etc"
      />

      <h1>view ticket</h1>
      {displayTicket()}

      <h2>comments</h2>
      {displayComments()}
    </div>
  );
} //END ViewTicket component
