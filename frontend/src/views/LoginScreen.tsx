// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../components/LoginButton";
import { useAppDispatch } from "../models/hooks";
import { loginAction } from "../models/reducers/userProfileSlice";
import SeoReactHelmet from "../components/SeoReactHelmet";
import isAdmin_hook from "../helpers/isAdmin_hook";

type Props = {};

// * this page will be display when user is not logged in
// * This page is only called from the AuthenticateRoute.tsx
export default function LoginScreen({}: Props) {
  // const dispatch = useAppDispatch();

  // dummy test my guest user but you can remove afterwards
  // const clickLoginAction = () => {
  //   const guestUserProfile = {
  //     email: "guestuser@mail.com",
  //     name: "GuestUser",
  //     role: "Nonadmin",
  //     created_on: "2022-04-10",
  //     avatar: "iKsomeUrl",
  //   };

  //   dispatch(loginAction(guestUserProfile));
  // };

  return (
    <div>
      <SeoReactHelmet
        pageTitle="coming from login screen "
        metaDescriptionContent="mDescContent-login screen"
        metaKeywordsContent="login screen & etc"
      />

      <code>iK LoginScreen component!!</code>
      <h3>You need to login/signup with Auth0 or login as guest user</h3>
      <LoginButton />
      {/* you can remove guest user after you are done */}
      {/* <button onClick={clickLoginAction}>Login as Guest User</button> */}
    </div>
  );
}
