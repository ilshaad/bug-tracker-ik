// popover for disabled button for tickets edit / delete / apply for assignee / tag as pending|resolved button
// react-bootstrap overlay & popover

import React, { JSX } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

type Props = { position: any; textInfo: string; children: JSX.Element };

export default function PopoverForButton({
  position,
  textInfo,
  children,
}: Props) {
  // from react-bootstrap doc
  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h6">Popover right</Popover.Header> */}
      <Popover.Body className="text-primary fw-bold">{textInfo}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["click"]}
      placement={position}
      overlay={popover}
      // show={}
    >
      {/* <Button variant="success">Click me to see</Button> */}
      {children}
    </OverlayTrigger>

    // <div
    //   // type="button"
    //   // class="btn btn-lg btn-danger"
    //   data-bs-toggle="popover"
    //   title="Popover title"
    //   data-bs-content="And here's some amazing content. It's very engaging. Right?"
    // >
    //   {children}
    // </div>
  );
}
