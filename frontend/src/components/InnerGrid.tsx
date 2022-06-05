import React, { Children } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";

type Props = { children: JSX.Element };

export default function InnerGrid({ children }: Props) {
  return (
    <div id="InnerGrid">
      <Container id="InnerGrid-main">{children}</Container>
      <footer id="InnerGrid-footer">
        <Footer />
      </footer>
    </div>
  );
}
