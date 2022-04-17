import React from "react";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";
import HomeLogin from "../components/HomeLogin";
import { Link } from "react-router-dom";
import SeoReactHelmet from "../components/SeoReactHelmet";
import { useAuth0, User } from "@auth0/auth0-react";

export default function Dashboard(): JSX.Element {
  const ua = useAuth0<User>();
  console.log("🚀 ~ file: Dashboard.tsx ~ line 11 ~ Dashboard ~ ua", ua);

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from Dashoard"
        metaDescriptionContent="mDescContent-dashboard"
        metaKeywordsContent="dashboard & etc"
      />

      <h1>Dashboard PAGE</h1>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="createticket">create ticket</Link>
        <Link to="ticketlist">ticketlist</Link>
        <Link to="viewticket/ticketidparams">viewticket/:ticketid</Link>
        <Link to="fetch">fetch</Link>
        <Link to="reduxtest">reduxtest</Link>
        <Link to="*">error page</Link>
      </nav>

      <div className="container breakpoint">
        <h1 className="container bg-primary text-secondary">
          iK testing responsive breakpoints for the containers1
        </h1>
        <h1 className="container bg-secondary text-primary">
          iK testing responsive breakpoints for the containers2
        </h1>
      </div>
      <LogoutButton />
      <Profile />
      <HomeLogin />
    </div>
  );
} //END Dashboard component
