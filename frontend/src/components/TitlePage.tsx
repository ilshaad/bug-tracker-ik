// main title heading for all routes

import React from "react";
import "../styles/components/TitlePage.css";

type Props = { titleName: string };

export default function TitlePage({ titleName }: Props) {
  return (
    <h1 id="TitlePage_component" className="text-center">
      {titleName}
    </h1>
  );
}
