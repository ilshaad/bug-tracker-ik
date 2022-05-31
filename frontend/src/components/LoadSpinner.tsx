// loading spinner
// mostly used for async loading or waiting for auth0 user object , etc

import React from "react";
import { Spinner } from "react-bootstrap";

type Props = { colour: string };

export default function LoadSpinner({ colour }: Props) {
  return <Spinner animation="border" variant={colour} />;
}
