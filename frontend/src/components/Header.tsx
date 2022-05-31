import React from "react";
import "../public/styles/components/Header.scss";

import { Link } from "react-router-dom";
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

  // display user name
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
      className="border-bottom border-dark border-3"
    >
      <Container fluid={true}>
        <Navbar.Brand>
          <Link to="/">
            {/* <img
              src={lizard}
              alt="lizard"
              className="col"
              style={{ width: "25px" }}
            /> */}
            <div className="header-logo" style={{ width: "50px" }}>
              <Image_responsive
                imageSrc={buglogo575}
                // img767={buglogo767}
                // img991={buglogo991}
                // img1199={buglogo1199}
                // img1399={buglogo1399}
                altString="bug tracker logo"
                // style={{ width: "60px" }}
              />
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Brand className="w-100">
          <div id="Header-userName">
            <span className="fs-6">logged in as:</span>&nbsp;{displayUserName()}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="d-sm-none "
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-sm-none">
            {/* <Nav.Link className="bg-primary text-danger" href="#features">
              Features
            </Nav.Link> */}

            {/* <div className="bg-primary text-light p-0 border border-dark border-2 rounded text-decoration-none fs-6">
              Logged in as:
            </div> */}

            <Link
              to="/"
              className="bg-secondary text-light p-2 border border-dark border-2 rounded text-decoration-none fs-5 fw-bold"
            >
              My dashboard
            </Link>
            <Link
              to="/ticketlist"
              className="bg-secondary text-light p-2 border border-dark border-2 rounded text-decoration-none fs-5 fw-bold"
            >
              Ticket lists
            </Link>
            <Link
              to="/createticket"
              className="bg-secondary text-light p-2 border border-dark border-2 rounded text-decoration-none fs-5 fw-bold"
            >
              Create ticket
            </Link>

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

  // ! the old header
  // return (
  //   <header id="OuterGrid-header">
  //     <div className="container-fluid m-0 p-0">
  //       <div className="row w-100 bg-primary m-0 p-0">
  //         {/* afterwards move username & logout button tot he bottom of the div container */}
  //         <div className="col">
  //           {displayUserName()}

  //           <div className="col">
  //             <LogoutButton />
  //           </div>
  //         </div>

  //         <img
  //           src={lizard}
  //           alt="lizard"
  //           className="col"
  //           style={{ width: "25px" }}
  //         />

  //         <nav className="col-8">
  //           <ul className="iktemp">
  //             <RouteList_anchorLinks />
  //           </ul>
  //         </nav>
  //       </div>
  //     </div>
  //   </header>
  // );
}
