import React from "react";
import "../public/styles/components/BackToTop_link.scss";

type Props = { className: string };

export default function BackToTop_link({ className }: Props) {
  return (
    <div id={`BackToTop_link`} className={className}>
      <a href="#top" className="text-decoration-none">
        <span className="fw-bolder text-decoration-none">&uarr;</span>
        <div className="d-inline-block text-decoration-underline">
          Back to top
        </div>
      </a>
    </div>
  );
}
