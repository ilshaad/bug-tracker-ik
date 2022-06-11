import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import "../public/styles/views/ViewTicket.scss";
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
import TitlePage from "../components/TitlePage";
import { Col, Container, Row } from "react-bootstrap";
import PopoverForButton from "../components/PopoverForButton";

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
    <Container id="ViewTicket-view-Container">
      <SeoReactHelmet
        pageTitle={`${ticket?.title} / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali`}
        metaDescriptionContent={`${ticket?.title} / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali`}
        metaKeywordsContent={`${ticket?.title} Bug Tracker RechadSalma ilshaad Kheerdali`}
      />

      <TitlePage titleName="Ticket" />

      {/* Show all the ticket info */}
      <Row
        className={`mx-auto`}
        style={{ marginTop: "-3rem" }}
        id="DisplayTicket-component"
      >
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 9, offset: 1 }}
          lg={{ span: 8, offset: 2 }}
        >
          <DisplayTicket ticket={ticket} />
        </Col>
      </Row>

      {/* row responsive design for all the ticket crud buttons */}
      <Row className="mx-auto gap-2" id="ticketButtonsCrud">
        {/* button & modal form to edit the ticket */}
        <Col
          xs={12}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 2 }}
          className="d-grid"
        >
          <EditTicket_button
            ticketSubmitted_by={ticket?.submitted_by}
            ticketAssigned_user={ticket?.assigned_user}
          />
        </Col>

        {/* button & modal form to delete the ticket, which will then redirect to dashboard */}
        <Col xs={12} md={{ span: 5 }} lg={{ span: 4 }} className={`d-grid`}>
          <DeleteTicket_button ticketSubmitted_by={ticket?.submitted_by} />
        </Col>

        {/* button to apply to become assigned user for the ticket. However just display a dummy toast message to user than submitted_user received notification */}
        <Col
          xs={12}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 2 }}
          className={`d-grid`}
        >
          <ApplyToAssignForTicket_button
            ticketSubmitted_by={ticket?.submitted_by}
            ticketAssigned_user={ticket?.assigned_user}
          />
        </Col>

        {/* button to toggle the status of the ticket between Resolved or Pending */}
        <Col xs={12} md={{ span: 5 }} lg={{ span: 4 }} className={`d-grid`}>
          <MarkAsResolvedOrPending_button ticketObject={ticket} />
        </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col as="h2" xs={{ offset: 2 }}>
          Comments
        </Col>
      </Row>

      {/* button to user if they want to create a new comment */}
      <Row>
        <Col>
          <CreateNewComment_button
            showCreateCommentBox={showCreateCommentBox}
            setShowCreateCommentBox={setShowCreateCommentBox}
            auth0UserObject={auth0UserObject}
          />
        </Col>
      </Row>

      {/* textarea form for user to create a new comment */}
      <CreateNewCommentBox
        showCreateCommentBox={showCreateCommentBox}
        setShowCreateCommentBox={setShowCreateCommentBox}
        auth0UserObject={auth0UserObject}
        ticket_id={ticket?.ticket_id}
      />

      {/* display all the comments under the ticket info */}
      <DisplayCommentList ticketId={ticket?.ticket_id!} />

      {/* toast message whenever user update ticket in some way */}
      <Message_toast />
    </Container>
  );
} //END ViewTicket component
