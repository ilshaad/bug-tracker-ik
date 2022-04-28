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
            <Link to="/fetch">fetch</Link>
          </li>
          <li>
            <Link to="/reduxtest">reduxtest</Link>
          </li>
          <li>
            <Link to="/*">error page</Link>
          </li>
          <li>
            <Link to="/viewticket/ticketidparams">viewticket/:ticketid</Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <Link to="/createticket">create ticket</Link>
      </li>
      <li>
        <Link to="/ticketlist">ticketlist</Link>
      </li>

      {devModeLinks()}
    </>
  );
}
