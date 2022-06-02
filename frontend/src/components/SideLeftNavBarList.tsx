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
        <Link to="/">
          <ListGroup.Item
            as="li"
            active={location.pathname === "/" ? true : false}
            // variant="blue"
            className="LeftNavBar-links"
          >
            Dashboard
          </ListGroup.Item>
        </Link>

        <Link to="/ticketlist">
          <ListGroup.Item
            as="li"
            active={location.pathname === "/ticketlist" ? true : false}
            className="LeftNavBar-links"
          >
            Tickets List
          </ListGroup.Item>
        </Link>

        <Link to="/createticket">
          <ListGroup.Item
            as="li"
            active={location.pathname === "/createticket" ? true : false}
            className="LeftNavBar-links"
          >
            Create a ticket
          </ListGroup.Item>
        </Link>

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
