import React from "react";
import "../public/styles/components/Header.scss";

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import lizard from "../public/images/li.jpg";
// import bugTrackerImg from "../public/manifest/mstile-150x150.png";
import RouteList_anchorLinks from "./RouteList_anchorLinks";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

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

  const displayUserName = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (isAuthenticated) {
      return <div className="col">{user.nickname}</div>;
    } else {
      return null;
    }
  };

  return (
    <Navbar
      id="OuterGrid-header"
      collapseOnSelect
      expand="sm"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={lizard}
              alt="lizard"
              className="col"
              style={{ width: "25px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="d-sm-none"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-sm-none">
            {/* <Nav.Link className="bg-primary text-danger" href="#features">
              Features
            </Nav.Link> */}
            <Link to="/" className="bg-secondary text-danger">
              My dashboard
            </Link>
            <Link to="/ticketlist" className="bg-secondary text-danger">
              Ticket lists
            </Link>
            <Link to="/createticket" className="bg-secondary text-danger">
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
