import React from "react";
import { Spinner } from "react-bootstrap";
import "../public/styles/components/LoadingScreen_foldingPage.scss";

type Props = {};

export default function LoadingScreen_foldingPage({}: Props) {
  return (
    <div id="LoadingScreen_foldingPage-views">
      <Spinner animation="border" variant="secondary" />
      <h2>Bug Tracker loading</h2>
    </div>
  );
}
