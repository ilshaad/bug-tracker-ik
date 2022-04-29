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
    // if (auth0.isLoading) return null;

    // if (auth0.isAuthenticated) {
    //   return auth0.user!.nickname;
    // } else {
    //   return null;
    // }

    // auth0User();
    // TODO return user name with your auth0User callback function you have created
    const testing = auth0User(
      () => <div>...Loading</div>,
      (user) => <div>{user.email}</div>
    );
    console.log(
      "🚀 ~ file: Dashboard.tsx ~ line 29 ~ displayUserName ~ testing ",
      testing
    );

    return null;
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
        <h1>display assigned user tickets</h1>
      </div>

      <div className="container">
        <h2>display submitted_by tickets</h2>
      </div>
    </div>
  );
} //END Dashboard component
