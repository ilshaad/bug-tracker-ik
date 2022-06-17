import React from "react";

type Props = {};

export default function Footer({}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <small className="d-flex flex-column justify-content-center align-items-center h-100 text-light bg-primary bg-gradient">
      <div>
        &copy; <time dateTime={`${currentYear}`}>{currentYear}</time> Copyright
        Ilshaad Kheerdali
      </div>

      {/* <div>Develop by: ilshaad Kheerdali</div> */}

      <a
        href="https://github.com/RechadSalma/bug-tracker-ik"
        className="text-decoration-underline text-light"
        target="_blank"
      >
        github.com/RechadSalma/bug-tracker-ik
      </a>
    </small>
  );
}
