import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";

export default function HomeLogin() {
  useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic outlined example"
      >
        <code>{process.env.TESTINGENV}</code>
        <LoginButton />
        {/* <button type="button" className="btn btn-outline-primary">
          Login
        </button> */}
        <button type="button" className="btn btn-outline-primary">
          Signup
        </button>
        <button type="button" className="btn btn-outline-primary">
          Login as Guest
        </button>
      </div>
    </div>
  );
} //END HomeLogin
