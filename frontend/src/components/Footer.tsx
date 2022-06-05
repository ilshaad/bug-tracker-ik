import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <small className="d-flex justify-content-center align-items-center h-100 text-light bg-primary bg-gradient">
      &copy; 2022 Copyright:&nbsp;
      <a
        href="https://github.com/RechadSalma/bug-tracker-ik"
        className="text-decoration-none text-light"
      >
        github.com/RechadSalma/bug-tracker-ik
      </a>
    </small>
  );
}
