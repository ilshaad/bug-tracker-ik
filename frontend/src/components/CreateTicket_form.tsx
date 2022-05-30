// Form component for /createticket route when user wants to create a new ticket
// Used Formik package to create the form for a new ticket, & when submitted it will be passed the newly created ticket object to redux actions to post the new ticket on the server & if successful it will also update redux tickets store

import React from "react";
import { Formik, FormikHelpers, Form, Field, FormikErrors } from "formik";
import { createTicket_dispatch_type } from "../types/tickets_type";
import auth0User from "../helpers/auth0User";
import { useAppDispatch } from "../models/hooks";
import { post_createTicket_actions } from "../models/reducers/tickets_slice";
import catchHandlerForReduxSlices from "../helpers/catchHandlerForReduxSlices";
import { useNavigate } from "react-router-dom";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import capitaliseString from "../helpers/capitaliseString";

// ticket_id / title / description / submitted_by / priority / assigned_user / status / app_name / app_version / created_on

type Props = {};

export default function CreateTicket_form({}: Props) {
  // collect user auth0 object
  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // form validation,for if user incorrectly mistype within the form
  // Used within Formik component for validation
  const validate = (values: createTicket_dispatch_type) => {
    const errors: FormikErrors<createTicket_dispatch_type> = {};

    if (!values.title) {
      errors.title = "Required";
    }
    // else if (values.title.length === 0) {
    //   errors.title = "Must be 1 characters or more";
    // }

    if (!values.description) {
      errors.description = "Required";
    }

    if (!values.priority) {
      errors.priority = "Required";
    }

    if (!values.status) {
      errors.status = "Required";
    }

    if (!values.app_name) {
      errors.app_name = "Required";
    }

    if (!values.app_version) {
      errors.app_version = "Required";
    }

    console.log(
      "🚀 ~ file: CreateTicketForm.tsx ~ line 19 ~ validate ~ errors",
      errors
    );

    return errors;
  }; //END validate method function

  // return formik jsx component
  return (
    <div>
      <h1>create new ticket</h1>

      {/* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */}
      <Formik
        // initial values for the ticket form object
        initialValues={{
          title: "",
          description: "",
          priority: "",
          assigned_user: "", // default to Unassigned if user types nothing
          status: "Pending", // Pending is default value
          app_name: "",
          app_version: "",
          submitted_by: "", //only the admin can use this
        }}
        // validate the ticket form object otherwise it will not submit until all validations is completed
        validate={validate}
        // complete your transaction you want to do when user successfully filled out the form correctly
        // submit the ticket form object to redux to POST SS the newly created ticket object & if successful update the redux tickets store too
        onSubmit={(ticketObject: createTicket_dispatch_type) => {
          // if assigned_user property is empty string than put 'Unassigned' as default value as no one is assigned to the ticket yet
          if (ticketObject.assigned_user === "") {
            ticketObject.assigned_user = "Unassigned";
          }
          // if user types 'guest' as assigned user, than capitalise first letter to 'Guest'
          else if (ticketObject.assigned_user === "guest") {
            ticketObject.assigned_user = "Guest";
          }

          // only the admin can change the submitted_by property
          // if empty string than user auth0 nickname will become default value
          if (ticketObject.submitted_by === "") {
            // if the user is 'guest' than save it as 'Guest' with capital first letter
            if (auth0UserObject.nickname === "guest") {
              ticketObject.submitted_by = "Guest";
            }
            // if user is not 'guest' user than save the user name as is
            else {
              ticketObject.submitted_by = auth0UserObject.nickname;
            }
          }

          // POST created ticket to ss psql & if successful than include new ticket to redux tickets store too
          // using redux action to complete the task
          dispatch(post_createTicket_actions(ticketObject))
            .then((res) => {
              // failed to create ticket on the server psql database
              if (res.type === "post/createTicket/rejected") {
                catchHandlerForReduxSlices(
                  "post_createdTicket_actions",
                  "CreatedTicketForm.tsx",
                  res
                );

                // navigate to dashboard with failed message
                navigate("/");

                // trigger message toast on the dashboard route of failed create ticket
                dispatch(
                  messageToast_actions(
                    "Unfortunately ticket was not created, refresh the page and try again please."
                  )
                );
              }

              // succeeded to create ticket on the server psql database
              if (res.type === "post/createTicket/fulfilled") {
                // navigate to dashboard with success message
                navigate("/");

                // trigger message toast on the dashboard route of success create ticket
                dispatch(
                  messageToast_actions("Successfully created a new ticket.")
                );
              }
            })
            .catch((err) => {
              catchHandlerForReduxSlices(
                "post_createdTicket_actions",
                "CreatedTicketForm.tsx",
                err
              );

              // navigate to dashboard with failed message
              navigate("/");

              // trigger message toast on the dashboard route of failed create ticket
              dispatch(
                messageToast_actions(
                  "Unfortunately ticket was not created, refresh the page and try again please."
                )
              );
            });
        }}
      >
        {/* <Formik> component is like a react context api & that it passes formikProps which gives you access to numerous of props to use such as errors / touched / values etc... */}
        {(formikProps) => (
          <Form>
            <label htmlFor="createTitle">Title *</label>
            {/* <Field/> is like input[type] element but is connected to formik component */}
            <Field
              type="text"
              id="createTitle"
              name="title"
              placeholder="Title name"
            />

            {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
            {formikProps.errors.title && formikProps.touched.title ? (
              <div>{formikProps.errors.title}</div>
            ) : null}

            <div></div>

            <label htmlFor="createDescription">Description *</label>
            <Field
              type="text"
              id="createDescription"
              name="description"
              placeholder="Describe the problem"
            />

            {formikProps.errors.description &&
            formikProps.touched.description ? (
              <div>{formikProps.errors.description}</div>
            ) : null}

            <div></div>

            <div role="group" aria-labelledby="priority-radio-group">
              Priority *:
              <label>
                <Field type="radio" name="priority" value="High" />
                High
              </label>
              <label>
                <Field type="radio" name="priority" value="Medium" />
                Medium
              </label>
              <label>
                <Field type="radio" name="priority" value="Low" />
                Low
              </label>
            </div>

            {formikProps.errors.priority && formikProps.touched.priority ? (
              <div>{formikProps.errors.priority}</div>
            ) : null}

            <div></div>

            <label htmlFor="createAssignedUser">Assigned user</label>
            <Field
              type="text"
              id="createAssignedUser"
              name="assigned_user"
              placeholder="Unassigned"
            />

            <div></div>

            <div role="group" aria-labelledby="status-radio-group">
              Status *:
              <label>
                <Field type="radio" name="status" value="Pending" checked />
                Pending
              </label>
              <label>
                <Field type="radio" name="status" value="Resolved" />
                Resolved
              </label>
            </div>

            {formikProps.errors.status && formikProps.touched.status ? (
              <div>{formikProps.errors.status}</div>
            ) : null}

            <div></div>

            <label htmlFor="createAppName">App Name *</label>
            <Field
              type="text"
              id="createAppName"
              name="app_name"
              placeholder="Name of the app"
            />

            {formikProps.errors.app_name && formikProps.touched.app_name ? (
              <div>{formikProps.errors.app_name}</div>
            ) : null}

            <div></div>

            <label htmlFor="createAppVersion">App version *</label>
            <Field
              type="text"
              id="createAppVersion"
              name="app_version"
              placeholder="App verison"
            />

            {formikProps.errors.app_version &&
            formikProps.touched.app_version ? (
              <div>{formikProps.errors.app_version}</div>
            ) : null}

            <div></div>

            {/* only admin can see & change the submitted_by property when creating a new ticket */}
            {(() => {
              if (auth0UserObject.email === process.env.ADMIN_EMAIL) {
                return (
                  <>
                    <label htmlFor="createSubmittedBy">Submitted by</label>
                    <Field
                      type="text"
                      id="createSubmittedBy"
                      name="submitted_by"
                      placeholder="Only admin can see &amp; change submitted_by property when creating new ticket"
                    />
                  </>
                );
              }
              return null;
            })()}

            <div></div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  ); //END return jsx component
} //END CreateTicket_form
