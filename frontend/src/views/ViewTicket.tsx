import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ApplyToAssignForTicket_button from "../components/ApplyToAssignForTicket_button";
import CreateNewComment_button from "../components/CreateNewComment_button";
import DeleteTicket_button from "../components/DeleteTicket_button";
import DisplayCommentList from "../components/DisplayCommentList";
import DisplayTicket from "../components/DisplayTicket";
import EditTicket_button from "../components/EditTicket_button";
import EditTicket_modal from "../components/EditTicket_modal";
import MarkAsResolvedOrPending_button from "../components/MarkAsResolvedOrPending_button";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { sortDateByOldestFirst_array } from "../helpers/sortByDate";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { get_allCommentsForASingleTicket_actions } from "../models/reducers/comments_slice";
import auth0User from "../helpers/auth0User";
import CreateNewCommentBox from "../components/CreateNewCommentBox";

export default function ViewTicket(): JSX.Element | null {
  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const ticketId_Params = useParams().ticketid;

  const ticket = useAppSelector((state) => state.tickets[ticketId_Params!]);
  // const comments = useAppSelector((state) => state.comments);

  // Boolean value for showing create comment text area box or create comment button
  const [showCreateCommentBox, setShowCreateCommentBox] =
    useState<boolean>(false);

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from view ticket"
        metaDescriptionContent="mDescContent-view ticket"
        metaKeywordsContent="view ticket and etc"
      />

      {/* toast message whenever user update ticket in some way */}
      <Message_toast />

      <h1>view ticket</h1>
      {/* Show all the ticket info */}
      <DisplayTicket ticket={ticket} />

      {/* button & modal form to edit the ticket */}
      <EditTicket_button
        ticketSubmitted_by={ticket?.submitted_by}
        ticketAssigned_user={ticket?.assigned_user}
      />

      {/* button & modal form to delete the ticket, which will then redirect to dashboard */}
      <DeleteTicket_button ticketSubmitted_by={ticket?.submitted_by} />

      {/* button to apply to become assigned user for the ticket. However just display a dummy toast message to user than submitted_user received notification */}
      <ApplyToAssignForTicket_button
        ticketSubmitted_by={ticket?.submitted_by}
        ticketAssigned_user={ticket?.assigned_user}
      />

      {/* button to toggle the status of the ticket between Resolved or Pending */}
      <MarkAsResolvedOrPending_button ticketObject={ticket} />

      <h2>comments</h2>
      {/* display all the comments under the ticket info */}
      <DisplayCommentList ticketId={ticket?.ticket_id!} />

      {/* button to user if they want to create a new comment */}
      <CreateNewComment_button
        showCreateCommentBox={showCreateCommentBox}
        setShowCreateCommentBox={setShowCreateCommentBox}
        auth0UserObject={auth0UserObject}
      />

      {/* textarea form for user to create a new comment */}
      <CreateNewCommentBox
        showCreateCommentBox={showCreateCommentBox}
        setShowCreateCommentBox={setShowCreateCommentBox}
        auth0UserObject={auth0UserObject}
      />
    </div>
  );
} //END ViewTicket component
