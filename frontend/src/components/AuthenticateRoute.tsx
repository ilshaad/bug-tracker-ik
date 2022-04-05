import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AuthenticateRoute(PageComponent: any) {
  const {
    // Auth state:
    // error,
    isAuthenticated,
    isLoading,
    // user,
    // Auth methods:
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims,
    loginWithRedirect,
    loginWithPopup,
    logout,
  } = useAuth0<any>();

  function component(): JSX.Element {
    return <PageComponent />;
  }

  return component;

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // return isAuthenticated && children;
  // (
  //   <div>
  //     <img src={user.picture} alt={user.name} />
  //     <h2>{user.name}</h2>
  //     <p>{user.email}</p>
  //   </div>
  // )
  // );
  // return children;
} //END AuthenticateRoute
