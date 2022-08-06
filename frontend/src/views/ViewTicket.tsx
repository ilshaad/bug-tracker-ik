import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";
import ApplyToAssignForTicket_button from "../components/ApplyToAssignForTicket_button";
import BackToTop_link from "../components/BackToTop_link";
import Comment_sortOption_selectForm from "../components/Comment_sortOption_selectForm";
import CreateNewCommentBox from "../components/CreateNewCommentBox";
import CreateNewComment_button from "../components/CreateNewComment_button";
import DeleteTicket_button from "../components/DeleteTicket_button";
import DisplayCommentList from "../components/DisplayCommentList";
import DisplayTicket from "../components/DisplayTicket";
import EditTicket_button from "../components/EditTicket_button";
import MarkAsResolvedOrPending_button from "../components/MarkAsResolvedOrPending_button";
import Message_toast from "../components/Message_toast";
import SeoReactHelmet from "../components/SeoReactHelmet";
import TitlePage from "../components/TitlePage";
import auth0User from "../scripts/auth0User";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import "../styles/views/ViewTicket.scss";
import { get_ticketList_actions } from "../models/reducers/tickets_slice";

export default function ViewTicket(): JSX.Element | null {
  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const dispatch = useAppDispatch();
  const ticketsList_dictionary = useAppSelector((state) => state.tickets);
  const numberOfTickets = Object.keys(ticketsList_dictionary).length;
  // when page first loads fetch all tickets list for redux ticket reducer store to collect
  // still fetches in login screen so not ideal, but decide to leave it for now, you can optimize this later if you wish
  // only call the tickets 5 times before you give up (the one extra is react first render which does not count)
  let numberOfFailedFetchCallbacksAllowed = 6;
  useEffect(() => {
    async function refetchRequest() {
      // if no tickets in redux store than get all the tickets
      if (numberOfTickets === 0) {
        // you get 5 total request call otherwise give up fetching ticket
        if (numberOfFailedFetchCallbacksAllowed !== 0) {
          await dispatch(get_ticketList_actions());

          numberOfFailedFetchCallbacksAllowed -= 1;
        }
      }
    }

    refetchRequest();
  }); //END useEffect()

  const ticketId_Params = useParams().ticketid;

  const ticket = useAppSelector((state) => state.tickets[ticketId_Params!]);
  // const comments = useAppSelector((state) => state.comments);

  // Boolean value for showing create comment text area box or create comment button
  const [showCreateCommentBox, setShowCreateCommentBox] =
    useState<boolean>(false);

  // Boolean value for comment sort option to pass to Comment_sortOption_selectForm & DisplayCommentList component
  // true = newest comments first || false = oldest comments fist
  const [newestCommentFirst_state, setNewestCommentFirst_state] =
    useState<boolean>(true);

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
        // style={{ marginTop: "-2.7em" }}
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

      <Row className="mt-3 mx-auto w-75">
        <Col
          as="h2"
          // xs={{ span: 10 }}
          lg={{ offset: 1, span: 10 }}
          className="mt-md-1 mt-lg-2"
        >
          Comments
        </Col>
      </Row>

      {/* create comment & sort option */}
      <Row className="mx-auto mb-1" id="creatCommentSortOption_buttons">
        <Col xs={{ span: 6 }} className="mx-auto">
          {/* button to user if they want to create a new comment */}
          <CreateNewComment_button
            showCreateCommentBox={showCreateCommentBox}
            setShowCreateCommentBox={setShowCreateCommentBox}
            auth0UserObject={auth0UserObject}
          />
        </Col>

        {/* sort option */}
        <Col xs={{ span: 6 }} className="mx-auto">
          <Comment_sortOption_selectForm
            newestCommentFirst_state={newestCommentFirst_state}
            setNewestCommentFirst_state={setNewestCommentFirst_state}
          />
        </Col>
      </Row>

      {/* textarea form for user to create a new comment */}
      <Row className="mx-auto w-75 createNewCommentBox_component-viewTicket-Row-Container">
        <CreateNewCommentBox
          showCreateCommentBox={showCreateCommentBox}
          setShowCreateCommentBox={setShowCreateCommentBox}
          auth0UserObject={auth0UserObject}
          ticket_id={ticket?.ticket_id}
        />
      </Row>

      {/* display all the comments under the ticket info */}
      <Row className="mx-auto w-75 mt-3">
        <DisplayCommentList
          ticketId={ticket?.ticket_id!}
          newestCommentFirst_state={newestCommentFirst_state}
        />
      </Row>

      <Row className="mb-2 mt-1">
        <Col
          xs={{ span: 4, offset: 2 }}
          lg={{ span: 3, offset: 2 }}
          className="w-75 mt-1"
        >
          <div className="ViewTicket-backToTopLink-component">
            <BackToTop_link className="" />
          </div>
        </Col>
      </Row>

      {/* toast message whenever user update ticket in some way */}
      <Message_toast />
    </Container>
  );
} //END ViewTicket component
