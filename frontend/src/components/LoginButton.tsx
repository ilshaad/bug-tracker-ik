import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "react-bootstrap";
import "../styles/components/LoginButton.scss";

type Props = { classStyle?: string };

const LoginButton = ({ classStyle }: Props) => {
  const { loginWithRedirect } = useAuth0();

  // useEffect(() => {
  //   console.log(lizardImage);
  // });

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className={classStyle}
      id="LoginButton_component"
    >
      Login / Signup
    </Button>
  );

  // return (
  //   <div className="card text-center mx-3">
  //     <div className="card-header">Featured</div>
  //     <div className="card-body">
  //       <h5 className="card-title">Welcome to Bug tracker</h5>
  //       <div>
  //         <img
  //           src={lizardImage}
  //           className="card-img-top w-25"
  //           alt="THIS SHOULD BE BUGTRACKER LOGO"
  //         />
  //       </div>

  //       <a href="#" className="btn btn-primary">
  //         <button onClick={() => loginWithRedirect()}>Login/Signup</button>
  //       </a>
  //       <p className="card-text">
  //         You can optionally login as guest_demo username with password
  //         Guestdemo@
  //       </p>
  //     </div>
  //     <div className="card-footer text-muted">2 days ago</div>
  //   </div>
  // );

  // return <button onClick={() => loginWithRedirect()}>Login/Signup</button>;
};

export default LoginButton;
