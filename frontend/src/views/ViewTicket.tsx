import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ApplyToAssignForTicket_button from "../components/ApplyToAssignForTicket_button";
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

export default function ViewTicket(): JSX.Element | null {
  const ticketId_Params = useParams().ticketid;

  const ticket = useAppSelector((state) => state.tickets[ticketId_Params!]);
  // const comments = useAppSelector((state) => state.comments);

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
      <DisplayTicket ticket={ticket} />
      {/* {displayTicket()} */}

      {/* <button>Edit ticket</button> */}
      <EditTicket_button
        ticketSubmitted_by={ticket?.submitted_by}
        ticketAssigned_user={ticket?.assigned_user}
      />

      {/* <button>Delete Ticket</button> */}
      <DeleteTicket_button ticketSubmitted_by={ticket?.submitted_by} />

      {/* <button>Apply to assign for the ticket</button> */}
      <ApplyToAssignForTicket_button
        ticketSubmitted_by={ticket?.submitted_by}
        ticketAssigned_user={ticket?.assigned_user}
      />

      {/* <button>Mark as Resolved</button> */}
      <MarkAsResolvedOrPending_button ticketObject={ticket} />

      <h2>comments</h2>
      <DisplayCommentList ticketId={ticket?.ticket_id!} />
    </div>
  );
} //END ViewTicket component
