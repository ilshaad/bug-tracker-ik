import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

export default function AuthenticateRoute(PageComponent: any) {
  const {
    // Auth state:
    // error,
    isAuthenticated,
    isLoading,
    // user,
    // Auth methods:
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    // loginWithRedirect,
    // loginWithPopup,
    // logout,
  } = useAuth0<any>();

  function Component() {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return isAuthenticated ? (
      <PageComponent />
    ) : (
      <div>
        <h3>You need to login/signup to view this page</h3>
        <LoginButton />
      </div>
    );
  }

  return Component;
} //END AuthenticateRoute
