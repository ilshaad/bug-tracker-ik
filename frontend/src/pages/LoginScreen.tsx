// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../components/LoginButton";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/reducers/userProfileSlice";

type Props = { au0?: boolean };

// * this page will be display when user is not logged in
// * This page is only called from the AuthenticateRoute.tsx
export default function LoginScreen({ au0 }: Props) {
  const dispatch = useAppDispatch();

  const loginAction = () => {
    const guestUserProfile = {
      email: "guestuser@mail.com",
      name: "GuestUser",
      role: "Nonadmin",
      created_on: "2022-04-10",
    };

    dispatch(login(guestUserProfile));
  };

  return (
    <div>
      <code>iK LoginScreen component!!</code>
      <h3>You need to login/signup with Auth0 or login as guest user</h3>
      <LoginButton />
      <button onClick={loginAction}>Login as Guest User</button>
    </div>
  );
}
