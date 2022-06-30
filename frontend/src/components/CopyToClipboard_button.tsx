// copy to clipboard button for guest password
// using react-copy-to-clipboard & react bootstrap tooltip to accompolich it
// svg clipboard icon

import React, { useEffect, useRef, useState } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../styles/components/CopyToClipboard.scss";

type Props = {};

export default function CopyToClipboard_button({}: Props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  // remove tooltip after 2 seconds after user copy
  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 2000);
    }
  });

  return (
    <span id="CopyToClipboard_component" className="ms-3">
      <Button
        ref={target}
        onClick={() => setShow(!show)}
        variant="light"
        className={`border border-3 ${!show ? "shadow-none" : ""}`}
        active={false}
        size="sm"
      >
        <CopyToClipboard text="Guest@12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clipboard"
            viewBox="0 0 16 16"
          >
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg>
        </CopyToClipboard>
      </Button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Copied password!
          </Tooltip>
        )}
      </Overlay>
    </span>
  );
}
