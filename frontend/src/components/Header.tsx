import React from "react";
import "../styles/components/Header.scss";

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import lizard from "../images/li.jpg";
import RouteList_anchorLinks from "./RouteList_anchorLinks";

type Props = {};

export default function Header({}: Props) {
  return (
    <header id="OuterGrid-header">
      <div className="container-fluid m-0 p-0">
        <div className="row w-100 bg-primary m-0 p-0">
          <img
            src={lizard}
            alt="lizard"
            className="col"
            style={{ width: "25px" }}
          />

          <nav className="col-8">
            <ul className="iktemp">
              <RouteList_anchorLinks />
            </ul>
          </nav>

          <div className="col">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
