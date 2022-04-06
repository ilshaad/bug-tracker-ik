import React from "react";
import AuthenticateRoute from "../components/AuthenticateRoute";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";

export default function TicketList(): JSX.Element {
  const Aroute = AuthenticateRoute(() => {
    return (
      <React.Fragment>
        <h1>i am protected routes</h1>
      </React.Fragment>
    );
  });

  // const Aroute = AuthenticateRoute(Profile);

  return (
    <div>
      <h1>TicketList PAGE</h1>
      <LogoutButton />
      <Profile />
      {/* {AuthenticateRoute(
        // <>
        //   <h1>this is authenticated route, hopefully it works</h1>
        // </>
      )} */}
      {/* </AuthenticateRoute> */}
      <Aroute />
    </div>
  );
} //END TicketList component