import React from "react";
import { Navigate } from "react-router-dom";
import { ticket_type } from "../types/tickets_type";

type Props = { ticket: ticket_type };

export default function DisplayTicket({ ticket }: Props) {
  // if ticket does not exist, redirect user to login/dashboard page
  if (!ticket) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <h1>ViewTicket:ticketid PAGE</h1>
      <h2>title: {ticket.title}</h2>
      <code>description: {ticket.description}</code>
      <p>priority: {ticket.priority}</p>
      <p>assigned_user: {ticket.assigned_user}</p>
      <p>status: {ticket.status}</p>
      <p>app_name: {ticket.app_name}</p>
      <p>app_version: {ticket.app_version}</p>
      <h4>admin only changes</h4>
      <p>submitted_by: {ticket.submitted_by}</p>
      <p>created_on: {ticket.created_on}</p>
    </div>
  );
}
