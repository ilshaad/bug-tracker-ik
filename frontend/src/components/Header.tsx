import React from "react";
import "../public/styles/components/Header.scss";

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import lizard from "../public/images/li.jpg";
import RouteList_anchorLinks from "./RouteList_anchorLinks";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {};

export default function Header({}: Props) {
  const {
    // Auth state:
    // error,
    isAuthenticated,
    isLoading,
    user,
    // Auth methods:
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    // loginWithRedirect,
    // loginWithPopup,
    // logout,
  } = useAuth0<any>();

  const displayUserName = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (isAuthenticated) {
      return <div className="col">{user.nickname}</div>;
    } else {
      return null;
    }
  };

  return (
    <header id="OuterGrid-header">
      <div className="container-fluid m-0 p-0">
        <div className="row w-100 bg-primary m-0 p-0">
          {/* afterwards move username & logout button tot he bottom of the div container */}
          <div className="col">
            {displayUserName()}

            <div className="col">
              <LogoutButton />
            </div>
          </div>

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
        </div>
      </div>
    </header>
  );
}
