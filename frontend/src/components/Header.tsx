import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import lizard from "../images/li.jpg";

type Props = {};

export default function Header({}: Props) {
  return (
    <div>
      <nav>
        <img src={lizard} alt="lizard" style={{ width: "25px" }} />
        <Link to="/">Dashboard</Link> &pound;
        <Link to="/createticket">create ticket</Link> &pound;
        <Link to="/ticketlist">ticketlist</Link> &pound;
        <Link to="/viewticket/ticketidparams">viewticket/:ticketid</Link>{" "}
        &pound;
        <Link to="/fetch">fetch</Link> &pound;
        <Link to="/reduxtest">reduxtest</Link> &pound;
        <Link to="/*">error page</Link>
      </nav>

      <LogoutButton />
    </div>
  );
}
