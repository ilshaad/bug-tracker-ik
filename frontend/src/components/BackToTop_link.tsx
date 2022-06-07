import React from "react";
import "../public/styles/components/BackToTop_link.scss";

type Props = { className: string };

export default function BackToTop_link({ className }: Props) {
  return (
    <div id={`BackToTop_link`} className={className}>
      <a href="#top">
        <span className="fw-bolder text-decoration-none">&uarr;</span> Back to
        top
      </a>
    </div>
  );
}
