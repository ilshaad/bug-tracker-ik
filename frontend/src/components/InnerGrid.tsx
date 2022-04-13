import React, { Children } from "react";
import Footer from "./Footer";

type Props = { children: JSX.Element };

export default function InnerGrid({ children }: Props) {
  return (
    <div id="InnerGrid">
      <main id="InnerGrid-main">{children}</main>
      <footer id="InnerGrid-footer">
        <Footer />
      </footer>
    </div>
  );
}
