import React, { useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import HomeLogin from "../components/HomeLogin";
import { Link } from "react-router-dom";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { useAuth0, User } from "@auth0/auth0-react";
import isAdmin_hook from "../helpers/isAdmin_hook";
import auth0User from "../helpers/auth0User";

export default function Dashboard(): JSX.Element {
  const auth0 = useAuth0<User>();

  const displayUserName = () => {
    const username = auth0User(
      () => <div>...Loading</div>,
      (user) => <div>{user.nickname}</div>
    );

    return username;
  };

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from Dashoard"
        metaDescriptionContent="mDescContent-dashboard"
        metaKeywordsContent="dashboard & etc"
      />

      <h1>{displayUserName()} Dashboard PAGE</h1>

      <div className="container">
        <h2>display assigned user tickets</h2>
      </div>

      <div className="container">
        <h2>display submitted_by tickets</h2>
      </div>

      <div>
        <button>delete my account</button>
      </div>
    </div>
  );
} //END Dashboard component
