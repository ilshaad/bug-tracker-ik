import React from "react";
import { Spinner } from "react-bootstrap";
import "../public/styles/views/FoldPageLoadingScreen.scss";

type Props = {};

export default function FoldPageLoadingScreen({}: Props) {
  return (
    <div id="FoldPageLoadingScreen-views">
      <Spinner animation="border" variant="secondary" />
      <h2>Bug Tracker loading</h2>
    </div>
  );
}
