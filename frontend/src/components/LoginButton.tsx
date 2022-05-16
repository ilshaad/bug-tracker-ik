import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import lizardImage from "../public/images/li.jpg";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  // useEffect(() => {
  //   console.log(lizardImage);
  // });

  return (
    <div className="card text-center mx-3">
      <div className="card-header">Featured</div>
      <div className="card-body">
        <h5 className="card-title">Welcome to Bug tracker</h5>
        <div>
          <img
            src={lizardImage}
            className="card-img-top w-25"
            alt="THIS SHOULD BE BUGTRACKER LOGO"
          />
        </div>

        <a href="#" className="btn btn-primary">
          <button onClick={() => loginWithRedirect()}>Login/Signup</button>
        </a>
        <p className="card-text">
          You can optionally login as guest_demo username with password
          Guestdemo@
        </p>
      </div>
      <div className="card-footer text-muted">2 days ago</div>
    </div>
  );

  // return <button onClick={() => loginWithRedirect()}>Login/Signup</button>;
};

export default LoginButton;
