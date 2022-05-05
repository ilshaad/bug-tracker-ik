import React, { useEffect, useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer"; // import "bootstrap/js/dist/toast";
// import * as bootstrap from "bootstrap";

import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import HomeLogin from "../components/HomeLogin";
import { Link } from "react-router-dom";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { useAuth0, User } from "@auth0/auth0-react";
import isAdmin_hook from "../helpers/isAdmin_hook";
import auth0User from "../helpers/auth0User";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import Ticket_anchorLinkToTicket from "../components/Ticket_anchorLinkToTicket";
import {
  messageToast_actions,
  nullTheMessageToast_actions,
} from "../models/reducers/messageToast_slice";
import Message_toast from "../components/Message_toast";

export default function Dashboard(): JSX.Element {
  const auth0UserObject = auth0User(
    () => null,
    (userObject) => userObject
  );

  const ticketList = useAppSelector((state) => {
    return state.tickets;
  });

  const dispatch = useAppDispatch();
  const messageToast = useAppSelector((state) => state.messageToasts.message);

  // return user nickname (username) from auth0 user object
  const displayUserName = () => {
    if (auth0UserObject === null) return "...loading";

    return auth0UserObject.nickname;
  };

  // return assigned_user list that the user is assigned to
  const listOfUserAssignedTickets = () => {
    if (auth0UserObject === null) return <div>...loading</div>;

    const userAssignedTickets = [];

    for (let ticketIdKey in ticketList) {
      const {
        ticket_id,
        title,
        description,
        submitted_by,
        priority,
        assigned_user,
        status,
        app_name,
        app_version,
        created_on,
      } = ticketList[ticketIdKey];

      if (assigned_user === auth0UserObject.nickname) {
        // title / description / submitted_by / priority / assigned_user / status / app_name / app_version / created_on
        const li = (
          <li key={ticket_id}>
            title:{" "}
            <Ticket_anchorLinkToTicket ticket={ticketList[ticketIdKey]} /> /
            description: {description}, / submitted_by: {submitted_by} /
            priority: {priority} / assigned_user: {assigned_user} / status:{" "}
            {status} / app_name: {app_name} / app_version: {app_version} /
            created_on: {created_on}
          </li>
        );

        userAssignedTickets.push(li);
      }
    }

    // user has no assigned tickets
    if (userAssignedTickets.length === 0)
      return <div>You have no assigned tickets</div>;

    // return list of user assigned tickets
    return <ul>{userAssignedTickets}</ul>;
  }; //END listOfUserAssignedTickets

  // return submitted_by list that the user is assigned to
  const listOfUserSubmittedTickets = () => {
    if (auth0UserObject === null) return <div>...loading</div>;

    const userSubmittedTickets = [];

    for (let ticketIdKey in ticketList) {
      const {
        ticket_id,
        title,
        description,
        submitted_by,
        priority,
        assigned_user,
        status,
        app_name,
        app_version,
        created_on,
      } = ticketList[ticketIdKey];

      if (submitted_by === auth0UserObject.nickname) {
        // title / description / submitted_by / priority / assigned_user / status / app_name / app_version / created_on
        const li = (
          <li key={ticket_id}>
            title:{" "}
            <Ticket_anchorLinkToTicket ticket={ticketList[ticketIdKey]} /> /
            description: {description}, / submitted_by: {submitted_by} /
            priority: {priority} / assigned_user: {assigned_user} / status:{" "}
            {status} / app_name: {app_name} / app_version: {app_version} /
            created_on: {created_on}
          </li>
        );

        userSubmittedTickets.push(li);
      }
    }

    // console.log(userSubmittedTickets);

    // user has not submitted tickets
    if (userSubmittedTickets.length === 0)
      return <div>You have no submitted tickets</div>;

    // return user list of submitted tickets
    return <ul>{userSubmittedTickets}</ul>;
  }; //END listOfUserSubmittedTickets

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from Dashoard"
        metaDescriptionContent="mDescContent-dashboard"
        metaKeywordsContent="dashboard & etc"
      />

      {/* message toast for user confirmation such as success or failure in creating a ticket */}
      <Message_toast />

      <h1>{displayUserName()} Dashboard PAGE</h1>

      <div className="container">
        <h2>display assigned user tickets</h2>
        {listOfUserAssignedTickets()}
      </div>

      <div className="container">
        <h2>display submitted_by tickets</h2>
        {listOfUserSubmittedTickets()}
      </div>

      <div>
        <button>delete my account</button>
      </div>
    </div>
  );
} //END Dashboard component
