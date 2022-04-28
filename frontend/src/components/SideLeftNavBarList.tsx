import React from "react";
import RouteList_anchorLinks from "./RouteList_anchorLinks";

type Props = {};

const SideLeftNavBarList = (props: Props) => {
  return (
    <>
      <h3>heading</h3>
      <ul>
        <RouteList_anchorLinks />
      </ul>
    </>
  );
};

export default SideLeftNavBarList;
