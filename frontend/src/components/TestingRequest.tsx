import React from "react";
import {
  get_ticketList,
  patch_updateTicket,
} from "../controllers/ticketsFetch";
import {
  delete_user,
  post_getUserProfile,
  post_userSignup,
} from "../controllers/usersFetch";

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

    delete_user(email)
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
    // const ticket = "77";
    const updateTicketObject = {
      ticket_id: "77",
      title: "clientTitle",
      description: "clientDescription",
      priority: "high",
      assigned_user: "clientassigned",
      status: "resolve",
      app_name: "client app",
      app_version: "v1",
    };

    try {
      const response = await patch_updateTicket(updateTicketObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={getUserProfile}>get user profile</button>
      <button onClick={signupUser}>signup user profile is send to SS</button>
      <button onClick={deleteUser}>Delete user from backend</button>
      <button onClick={getTicketList}>Get all ticket list</button>
      <button onClick={updateTicket}>Update a ticket</button>
    </div>
  );
}
