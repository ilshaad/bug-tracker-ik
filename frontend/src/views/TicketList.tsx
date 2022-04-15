import React from "react";
// import AuthenticateRoute from "../components/AuthenticateRoute";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import SeoReactHelmet from "../components/SeoReactHelmet";

export default function TicketList(): JSX.Element {
  // const Aroute = AuthenticateRoute(() => {
  //   return (
  //     <React.Fragment>
  //       <h1>i am protected routes {coolio}</h1>
  //     </React.Fragment>
  //   );
  // });

  // const Aroute = AuthenticateRoute(Profile);

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from ticket list"
        metaDescriptionContent="mDescContent-ticket list"
        metaKeywordsContent="ticket list & etc"
      />

      <h1>TicketList PAGE</h1>
      <LogoutButton />
      <Profile />
      {/* {AuthenticateRoute(
        // <>
        //   <h1>this is authenticated route, hopefully it works</h1>
        // </>
      )} */}
      {/* </AuthenticateRoute> */}
      {/* <Aroute /> */}
    </div>
  );
} //END TicketList component

// import React from 'react'

// type Props = {}

// function TicketList({}: Props) {
//   return (
//     <div>TicketList</div>
//   )
// }

// export default TicketList
