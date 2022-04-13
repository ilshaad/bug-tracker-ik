import React from "react";
import InnerGrid from "./InnerGrid";
import SideLeftNavBarList from "./SideLeftNavBarList";

type Props = { children: JSX.Element };

export default function OuterGrid({ children }: Props) {
  return (
    <div id="OuterGrid">
      <header id="OuterGrid-header">OG header</header>
      <main id="OuterGrid-main">
        <InnerGrid>{children}</InnerGrid>
      </main>
      <nav id="OuterGrid-leftNavBar">
        <SideLeftNavBarList />
      </nav>
    </div>
  );
}
