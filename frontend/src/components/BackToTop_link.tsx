import React from "react";
import "../styles/components/BackToTop_link.css";

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
