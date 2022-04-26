// IK FOR DEVELOPMENT USE ONLY
// this route is for testing & will only show up when in development mode

import React from "react";

import get_ticketList from "./../controllers/ticketsFetch/get_ticketList";
import post_createTicket from "../controllers/ticketsFetch/post_createTicket";
import patch_updateTicket from "../controllers/ticketsFetch/patch_updateTicket";
import delete_deleteTicket from "../controllers/ticketsFetch/delete_deleteTicket";

import get_allCommentsForASingleTicket from "../controllers/commentsFetch/get_allCommentsForASingleTicket";
import post_createComment from "../controllers/commentsFetch/post_createComment";
import patch_updateComment from "../controllers/commentsFetch/patch_updateComment";
import delete_deleteComment from "../controllers/commentsFetch/delete_deleteComment";

import {
  delete_deleteUser,
  post_getUserProfile,
  post_userSignup,
} from "../controllers/usersFetch";

import { ticket_type } from "../@types/tickets_type";
import { comment_type } from "../@types/comments_type";

export default function App(): JSX.Element {
  // DevelopmentModeOnly();

  const getUserProfile = () => {
    // * scaffold to create your request within the button
    // fetchBackendApi()
    //   .get("/api/ticket/list")
    //   .then((res) => console.log(res));
    //
    const dummyEmail: string = "v1@mail.com";

    // post user login email & recieve user profile
    post_getUserProfile(dummyEmail)
      .then((data) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  const signupUser = () => {
    const user = {
      user_id: "4444",
      email: "client@mail.com",
      name: "clientname",
      role: "Nonadmin",
      created_on: "2022-04-15",
    };

    post_userSignup(user)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = () => {
    const email = "client@mail.com";

    delete_deleteUser(email)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTicketList = () => {
    get_ticketList()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTicket = async () => {
    const updateTicketObject: ticket_type = {
      ticket_id: "70d966f8-8e1f-4bda-a568-5ff82116b507",
      title: "update ticket",
      description: "update ticket",
      priority: "update ticket",
      assigned_user: "update ticket",
      status: "update ticket",
      app_name: "update ticket",
      app_version: "update ticket",
      submitted_by: "admin",
      created_on: "2022-04-21 11:58:00",
    };

    try {
      const response = await patch_updateTicket(updateTicketObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createTicket = () => {
    const createTicketObject: ticket_type = {
      title: "client create",
      description: "client create",
      submitted_by: "client create",
      priority: "high",
      assigned_user: "client create",
      status: "client create",
      app_name: "client create",
      app_version: "client create",
      ticket_id: "",
      created_on: "",
    };

    post_createTicket(createTicketObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTicket = () => {
    const ticketId = "456";

    delete_deleteTicket(ticketId)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allCommentsForASingleTicket = () => {
    const ticketId = "049e7fd3-753c-4123-8df5-df3aab63d9d2";

    get_allCommentsForASingleTicket(ticketId)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createComment = () => {
    const commentObject: comment_type = {
      // comment_id: "456",
      ticket_id: "456",
      name: "create comment",
      email: "createComment@mail.com",
      text_comment: "create comment",
      comment_id: "make up id",
      created_on: "1999-01-12",
    };

    post_createComment(commentObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateComment = () => {
    const commentObject: comment_type = {
      comment_id: "d07ff472-9d26-4bd7-8dc5-77c5892e4190",
      text_comment: "updated comment",
      ticket_id: "999",
      name: "555",
      email: "zzz",
      created_on: "2000-02-02 11:11:11",
    };

    patch_updateComment(commentObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const deleteComment = () => {
    const comment_id = "456";

    delete_deleteComment(comment_id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button onClick={getUserProfile}>get user profile</button>
      <button onClick={signupUser}>signup user profile is send to SS</button>
      <button onClick={deleteUser}>Delete user from backend</button>
      <button onClick={getTicketList}>Get all ticket list</button>
      <button onClick={updateTicket}>Update a ticket</button>
      <button onClick={createTicket}>Create a new ticket</button>
      <button onClick={deleteTicket}>Delete a ticket</button>
      <button onClick={allCommentsForASingleTicket}>
        Get all comments for a single ticket
      </button>{" "}
      <button onClick={createComment}>User creates a new comment</button>
      <button onClick={updateComment}>User updates their comment</button>{" "}
      <button onClick={deleteComment}>User delete their comment</button>
    </div>
  );
}
