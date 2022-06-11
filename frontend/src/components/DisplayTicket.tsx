import React from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import "../public/styles/components/DisplayTicket.scss";

import { ticket_type } from "../types/tickets_type";

type Props = { ticket: ticket_type };

export default function DisplayTicket({ ticket }: Props) {
  // if ticket does not exist, redirect user to login/dashboard page
  if (!ticket) {
    return <Navigate to={"/"} />;
  }

  const {
    title,
    description,
    priority,
    assigned_user,
    status,
    app_name,
    app_version,
    submitted_by,
    created_on,
  } = ticket;

  return (
    <>
      <h2 className={`text-center fs-2`}>{title}</h2>

      <h3 className={`viewTicket-headings text-secondary`}>Priority:</h3>
      {(() => {
        if (priority === "High") {
          return <p className="text-danger fw-bold">High</p>;
        } else if (priority === "Medium") {
          return <p className="text-warning fw-bold">Medium</p>;
        } else if (priority === "Low") {
          return <p className="fw-bold">Low</p>;
        }
      })()}

      <h3 className={`viewTicket-headings text-secondary`}>Status:</h3>
      {status === "Resolved" ? (
        <p className="text-info fw-bold">Resolved</p>
      ) : (
        <p className="text-danger fw-bold">Pending</p>
      )}

      <h3 className={`viewTicket-headings text-secondary`}>Name of app:</h3>
      <p>{app_name}</p>

      <h3 className={`viewTicket-headings text-secondary`}>App version:</h3>
      <p>{app_version}</p>

      <h3 className={`viewTicket-headings text-secondary`}>Assigned user:</h3>
      {assigned_user === "Unassigned" ? (
        <p className="text-danger fw-bold">Unassigned</p>
      ) : (
        <p>{assigned_user}</p>
      )}

      <h3 className="viewTicket-headings text-secondary">
        Ticket Description:
      </h3>
      <p>{description}</p>

      <h3 className={`viewTicket-headings text-secondary`}>Submitted by:</h3>
      <p>{submitted_by}</p>

      <h3 className={`viewTicket-headings text-secondary`}>Date Submitted:</h3>
      <p>{created_on}</p>
    </>
  );
}
