// Form for /createticket route when user wants to create a new ticket
import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { createTicket_dispatch_type } from "../@types/tickets_type";

// ticket_id / title / description / submitted_by / priority / assigned_user / status / app_name / app_version / created_on

// interface Values {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

type Props = {};

export default function CreateTicketForm({}: Props) {
  return (
    <div>
      <h1>create new ticket</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          submitted_by: "",
          priority: "",
          assigned_user: "",
          status: "",
          app_name: "",
          app_version: "",

          // firstName: "",
          // lastName: "",
          // email: "",
        }}
        onSubmit={(
          ticketValue: createTicket_dispatch_type
          // { setSubmitting }: FormikHelpers<createTicket_dispatch_type>
        ) => {
          setTimeout(() => {
            console.log(JSON.stringify(ticketValue, null, 2));
            // setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="createTitle">Title</label>
          <Field id="createTitle" name="title" placeholder="Title name" />

          <label htmlFor="createDescription">Description</label>
          <Field
            id="createDescription"
            name="description"
            placeholder="Describe the problem"
          />

          {/* <label htmlFor="createSubmittedBy">Submitted by</label>
          <Field
            id="createSubmittedBy"
            name="submitted_by"
            placeholder="Who submitted the ticket"
          /> */}

          <label htmlFor="createPriority">Priority</label>
          <Field
            id="createPriority"
            name="priority"
            placeholder="High / Medium / Low"
          />

          <label htmlFor="createAssignedUser">Assigned user</label>
          <Field
            id="createAssignedUser"
            name="assigned_user"
            placeholder="John / Unassigned"
          />

          <label htmlFor="createStatus">Status</label>
          <Field
            id="createStatus"
            name="status"
            placeholder="Pending / Resolved"
          />

          <label htmlFor="createAppName">App Name</label>
          <Field
            id="createAppName"
            name="app_name"
            placeholder="Name of the app"
          />

          <label htmlFor="createAppVersion">App version</label>
          <Field
            id="createAppVersion"
            name="app_version"
            placeholder="App verison"
          />

          {/* <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          /> */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
