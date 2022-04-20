import React from "react";
import {
  delete_deleteComment,
  get_allCommentsForASingleTicket,
  patch_updateComment,
  post_createComment,
} from "../controllers/commentsFetch";
import {
  delete_deleteTicket,
  get_ticketList,
  patch_updateTicket,
  post_createTicket,
} from "../controllers/ticketsFetch";
import {
  delete_deleteUser,
  post_getUserProfile,
  post_userSignup,
} from "../controllers/usersFetch";
import {
  createComment_type,
  createTicket_type,
  updateTicket_type,
} from "../@types/backendFetch_types";

export default function App(): JSX.Element {
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
    const updateTicketObject: updateTicket_type = {
      ticket_id: "456",
      title: "update ticket",
      description: "update ticket",
      priority: "update ticket",
      assigned_user: "update ticket",
      status: "update ticket",
      app_name: "update ticket",
      app_version: "update ticket",
    };

    try {
      const response = await patch_updateTicket(updateTicketObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createTicket = () => {
    const createTicketObject: createTicket_type = {
      ticket_id: "456",
      title: "client create",
      description: "client create",
      submitted_by: "client create",
      priority: "high",
      assigned_user: "client create",
      status: "client create",
      app_name: "client create",
      app_version: "client create",
      created_on: "2022-04-16",
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
    const commentObject: createComment_type = {
      comment_id: "456",
      ticket_id: "456",
      name: "create comment",
      email: "createComment@mail.com",
      text_comment: "create comment",
      created_on: "2022-04-17",
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
    const comment_id = "456",
      text_comment = "update comment";

    patch_updateComment(comment_id, text_comment)
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
