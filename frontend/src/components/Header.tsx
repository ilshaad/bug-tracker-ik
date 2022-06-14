// include header, which is responsive navbar which only shows the sandwich image when in <576px with route links & logout button

import React from "react";
import "../public/styles/components/Header.scss";

import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import lizard from "../public/images/li.jpg";
// import bugTrackerImg from "../public/manifest/mstile-150x150.png";
import RouteList_anchorLinks from "./RouteList_anchorLinks";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoadSpinner from "./LoadSpinner";
import Image_responsive from "./Image_responsive";
import buglogo575 from "../public/images/Bug-Tracker-575.jpg";
import buglogo767 from "../public/images/Bug-Tracker-767.jpg";
import buglogo991 from "../public/images/Bug-Tracker-991.jpg";
import buglogo1199 from "../public/images/Bug-Tracker-1199.jpg";
import buglogo1399 from "../public/images/Bug-Tracker-1399.jpg";

type Props = {};

export default function Header({}: Props) {
  const {
    // Auth state:
    // error,
    isAuthenticated,
    isLoading,
    user,
    // Auth methods:
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    // loginWithRedirect,
    // loginWithPopup,
    // logout,
  } = useAuth0<any>();

  const uselocation = useLocation();

  // gain the user name (auth0.nickname) to display who the user is
  const displayUserName = () => {
    if (isLoading) {
      return <LoadSpinner colour="light" />;
    }

    if (isAuthenticated) {
      if (user.nickname === "guest") {
        return "Guest";
      } else {
        return user.nickname;
      }
    } else {
      return null;
    }
  }; //END displayUserName()

  return (
    <Navbar
      id="OuterGrid-header"
      collapseOnSelect
      expand="sm"
      bg="primary"
      variant="dark"
      className="border-bottom border-dark border-3 bg-gradient"
    >
      <Container fluid={true}>
        {/* the bug tracker logo image to link to dashboard route */}
        <Navbar.Brand id="top">
          <Link to="/#top">
            <div className="Header-logo">
              <Image_responsive
                imageSrc={buglogo575}
                img767={buglogo767}
                // img991={buglogo991}
                // img1199={buglogo1199}
                // img1399={buglogo1399}
                altString="bug tracker logo"
                // style={{ width: "60px" }}
              />
            </div>
          </Link>
        </Navbar.Brand>

        {/* to display user their user name */}
        <Navbar.Brand id="Header-component-navbarBrandUsername">
          <div id="Header-userName">
            <span className="fs-6">Logged in as:</span>&nbsp;
            {displayUserName()}
          </div>
        </Navbar.Brand>

        {/* display the Bug tracker heading only when >576 design */}
        {/* <Navbar.Brand className="Header-brandHeading d-none d-sm-block text-secondary">
          <h1>Bug Tracker</h1>
        </Navbar.Brand> */}

        {/* iK? this is the sandwich bar when <575 design */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="d-sm-none"
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="d-sm-none">
          <Nav className="me-auto d-sm-none">
            {/* iK I did not use bootstrap Nav.Link because I could not configure it like I wanted to using react-router Link component */}
            {/* <Nav.Link className="bg-primary text-danger" href="#features">
              Features
            </Nav.Link> */}

            {/* using react-router Link component */}
            {/* dashboard link */}
            <Link
              to="/#top"
              className={`Header-navLinks p-2 border border-dark border-1 rounded text-decoration-none fs-5 fw-bold ${
                uselocation.pathname === "/" ? "Header-navLinks-current" : ""
              }`}
            >
              My Dashboard
            </Link>

            {/* ticket list link */}
            <Link
              to="/ticketlist#top"
              className={`Header-navLinks p-2 border border-dark border-1 rounded text-decoration-none fs-5 fw-bold ${
                uselocation.pathname === "/ticketlist"
                  ? "Header-navLinks-current"
                  : ""
              }`}
            >
              Tickets list
            </Link>

            {/* create ticket link */}
            <Link
              to="/createticket#top"
              className={`Header-navLinks p-2 border border-dark border-1 rounded text-decoration-none fs-5 fw-bold ${
                uselocation.pathname === "/createticket"
                  ? "Header-navLinks-current"
                  : ""
              }`}
            >
              Create Ticket
            </Link>

            {/* logout button */}
            <div className="Header-navLinks text-light p-2 border border-dark border-1 rounded text-decoration-none fs-5 fw-bold">
              <LogoutButton />
            </div>

            {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
