import React from "react";
import OuterGrid from "./OuterGrid";

type Props = { children: JSX.Element };

export default function Layout({ children }: Props) {
  return <OuterGrid>{children}</OuterGrid>;
}
