import React from "react";
import "../public/styles/components/BackToTop_link.scss";

type Props = {};

export default function BackToTop_link({}: Props) {
  return (
    <div id={`BackToTop_link`}>
      <a href="#top">
        <span className="fw-bolder fs-5 text-decoration-none">&uarr;</span> Back
        to top
      </a>
    </div>
  );
}
