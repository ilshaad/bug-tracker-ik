import React from "react";
import Footer from "./Footer";

type Props = { children: JSX.Element };

export default function InnerGrid({ children }: Props) {
  return (
    <div id="InnerGrid">
      <div id="InnerGrid-main">{children}</div>
      <footer id="InnerGrid-footer">
        <Footer />
      </footer>
    </div>
  );
}
