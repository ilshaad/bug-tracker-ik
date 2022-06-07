import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import RouteList_anchorLinks from "./RouteList_anchorLinks";
import "../public/styles/components/SideLeftNavBarList.scss";

type Props = {};

const SideLeftNavBarList = (props: Props) => {
  const location = useLocation();

  useEffect(() => console.log(location.pathname));

  return (
    <>
      <ListGroup as="ul">
        {/* dashboard route */}
        <Link to="/">
          <ListGroup.Item
            as="li"
            active={location.pathname === "/" ? true : false}
            // variant="blue"
            className={`LeftNavBar-links ${
              location.pathname === "/" ? "hoverNav" : ""
            }`}
          >
            My Dashboard
          </ListGroup.Item>
        </Link>

        {/* ticketlist route */}
        <Link to="/ticketlist">
          <ListGroup.Item
            as="li"
            // active={location.pathname === "/ticketlist" ? true : false}
            className={`LeftNavBar-links ${
              location.pathname === "/ticketlist" ? "hoverNav" : ""
            }`}
          >
            Tickets List
          </ListGroup.Item>
        </Link>

        {/* create list route */}
        <Link to="/createticket">
          <ListGroup.Item
            as="li"
            active={location.pathname === "/createticket" ? true : false}
            className={`LeftNavBar-links ${
              location.pathname === "/createticket" ? "hoverNav" : ""
            }`}
          >
            Create Ticket
          </ListGroup.Item>
        </Link>

        {/* logout button */}
        <ListGroup.Item as="li" className="LeftNavBar-links">
          <LogoutButton />
        </ListGroup.Item>
      </ListGroup>

      {/* <ul>
        <RouteList_anchorLinks />
      </ul> */}
    </>
  );
};

export default SideLeftNavBarList;
