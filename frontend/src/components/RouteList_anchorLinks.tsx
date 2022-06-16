import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function RouteList_anchorLinks({}: Props) {
  // do not display development links to routes in production mode
  const devModeLinks = () => {
    if (process.env.NODE_ENV !== "production") {
      return (
        <>
          <li>
            <Link to="/fetch#top">fetch</Link>
          </li>
          <li>
            <Link to="/reduxtest#top">reduxtest</Link>
          </li>
          <li>
            <Link to="/*">error page</Link>
          </li>
          <li>
            <Link to="/viewticket/ticketidparams#top">
              viewticket/:ticketid
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <li>
        <Link to="/#top">Dashboard</Link>
      </li>
      <li>
        <Link to="/createticket#top">create ticket</Link>
      </li>
      <li>
        <Link to="/ticketlist#top">ticketlist</Link>
      </li>

      {/** !! UNCOMMENT FOR DEVMODE TO DISPLAY OTHER ROUTES FOR TESTING
       * also uncomment the devRoute() callback in App.tsx to get the routes to work
       * iK I AM NOT SURE IF THIS STILL WORKS BECAUSE I CHANGE A FEW THINGS
       */}
      {/* {devModeLinks()} */}
    </>
  );
}
