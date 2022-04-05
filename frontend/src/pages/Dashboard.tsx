import React from "react";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profiles";

export default function Dashboard(): JSX.Element {
  return (
    <div>
      <h1>Dashboard PAGE</h1>
      <LogoutButton />
      <Profile />
    </div>
  );
} //END Dashboard component
