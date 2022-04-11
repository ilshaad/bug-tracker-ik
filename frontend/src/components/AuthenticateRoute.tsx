import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginScreen from "../pages/LoginScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/reducers/userProfileSlice";

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

  const dispatch = useAppDispatch();

  function Component() {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    // collect redux guest user loggedIn state
    const loggedInState = useAppSelector((state) => state.userProfile.loggedIn);

    // * Give user access if isAuthenictcated or guest loggedIn is true, otherwise send them back to the login screen
    //IF isAuthenticated & loggedInState are false THEN it is true & the user is not logged in
    if (!isAuthenticated && !loggedInState) {
      //  IF redux loggedIn guest user is false THEN
      // if (loggedInState !== false) {
      //    ASSIGN redux login as false
      dispatch(logout());
      //    RETURN login & guess login buttons page
      return <LoginScreen />;
      // }

      //  ELSE IF redux loggedIn guest user is true THEN
      // else if (loggedInState) {
      //  ASSIGN redux loggedIn as true & assign the user information
      // dispatch(lo)

      //    RETURN PageComponent
      // return <PageComponent />;
    } else {
      return <PageComponent />;
    }
    //  END IF

    //ELSE IF isAuthenticated is true THEN
    // else if (isAuthenticated) {
    //  RETURN PageComponent
    //END IF
    // }
    // } //END if statement on isAuthehtidated & guest user

    // ? working function but remove once guest login is working fine too
    // return isAuthenticated ? (
    //   <PageComponent />
    // ) : (
    //   <div>
    //     <LoginScreen au0={isAuthenticated} />
    //   </div>
    // );
  }

  return Component;
} //END AuthenticateRoute
