import React from "react";
import { Spinner } from "react-bootstrap";
import "../styles/components/LoadingScreen_foldingPage.css";
// import Image_responsive from "./Image_responsive";
// import bugTrackerImg575 from "../public/images/Bug-Tracker-575.jpg";

type Props = {};

export default function LoadingScreen_foldingPage({}: Props) {
  return (
    <div id="LoadingScreen_foldingPage-views">
      {/* <h2>Bug Tracker loading</h2> */}
      {/* <div className="logoimgLoadingPage">
        <Image_responsive
          imageSrc={bugTrackerImg575}
          altString="bug tracker loading screen"
        />
      </div> */}
      {/* <br /> */}
      <Spinner
        className={`spinnerLoadingPage`}
        animation="border"
        variant="primary"
      />
      <h3 className="mt-5 mx-5 text-center">
        Please allow up to 60seconds to load as I am using a free server
      </h3>
    </div>
  );
}
