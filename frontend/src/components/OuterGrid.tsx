import React from "react";
// import "./OuterGrid.scss";

type Props = { children: JSX.Element };

export default function OuterGrid({ children }: Props) {
  return (
    <div id="OuterGrid">
      <header id="OuterGrid-header">OG header</header>
      <main id="OuterGrid-main">
        <p>OG main</p> {children}
      </main>
    </div>
  );
}
