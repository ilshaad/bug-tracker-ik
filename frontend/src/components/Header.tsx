import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Header({}: Props) {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> &pound;
        <Link to="/createticket">create ticket</Link> &pound;
        <Link to="/ticketlist">ticketlist</Link> &pound;
        <Link to="/viewticket/ticketidparams">viewticket/:ticketid</Link>{" "}
        &pound;
        <Link to="/fetch">fetch</Link> &pound;
        <Link to="/reduxtest">reduxtest</Link> &pound;
        <Link to="/*">error page</Link>
      </nav>
    </div>
  );
}
