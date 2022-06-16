import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoadingScreen_foldingPage from "../components/LoadingScreen_foldingPage";
import LoginScreen from "../views/LoginScreen";
import Layout from "./Layout";

export default function AuthenticateRoute_HOC(PageComponent: any) {
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

  function Component() {
    if (isLoading) {
      return <LoadingScreen_foldingPage />;
    }

    // Auth0 will authenticate each routes & if false user will be redirected to the login screen everytime
    if (isAuthenticated) {
      // console.log(user);
      // console.log("iK authenticated");
      // dispatch( )
      return (
        <Layout>
          <PageComponent />
        </Layout>
      );
    } else {
      // console.log(user);
      // console.log("iK unauthenticated");
      return <LoginScreen />;
    }
  }

  return Component;
} //END AuthenticateRoute
