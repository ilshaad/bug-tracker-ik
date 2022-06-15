// user can click on this button to logout auth0
// used div tag because it is easier to style compared to button tag with bootstrap

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </div>
  );
};

export default LogoutButton;
