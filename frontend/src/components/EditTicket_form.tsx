// Edit form component within the modal component when authorized user clicks edit button
// will update ticket on SS psql & redux tickets store
// - close the modal & then show a toast message indicating if successful or not
//  -authorized user is submitted_by / assigned_user / admin
// authorized user can only update certains values within the ticket : title / description / priority / assigned_user / app_name / app_version
//  - but only admin can update the submitted_by value
// Using Formik as component
// Also place some of react bootstrap Modal componetn with (Modal.Body & Modal.Footer) because I want to keept the Body & Footer as siblings to get the proper structure as it is meant to be
// -  iK I had to do it this way because I could not trigger the submit event if the components as siblings outside of the form component
// I did not use controllerd input as recommended but it seems to be working fine

import { Field, Form, Formik, FormikErrors } from "formik";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import auth0User from "../helpers/auth0User";
import catchHandlerForReduxSlices from "../helpers/catchHandlerForReduxSlices";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { patch_updateTicket_actions } from "../models/reducers/tickets_slice";
import { ticket_type } from "../types/tickets_type";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import { Button, Modal } from "react-bootstrap";

type Props = { closeModal_function: Function };

export default function EditTicket_form({ closeModal_function }: Props) {
  const dispatch = useAppDispatch();

  // collect the single ticket to update
  const ticketId_params = useParams().ticketid;
  const ticket = useAppSelector((state) => state.tickets[ticketId_params!]);

  const auth0UserObject = auth0User(
    () => null,
    (user) => user
  );

  // Auto checked priority radio group to match the ticket prioirity
  const autoCheckPriority = (priorityValue: string) => {
    if (priorityValue === ticket.priority) return true;
    if (priorityValue === ticket.priority) return true;
    if (priorityValue === ticket.priority) return true;

    return null;
  };

  // form validation,for if user incorrectly mistype within the form
  // Used within Formik component for validation
  const validate = (values: ticket_type) => {
    const errors: FormikErrors<ticket_type> = {};

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

    if (!values.assigned_user) {
      errors.assigned_user = "Required";
    }

    if (!values.app_name) {
      errors.app_name = "Required";
    }

    if (!values.app_version) {
      errors.app_version = "Required";
    }

    return errors;
  }; //END validate method function

  // return formik jsx component
  return (
    <div>
      <h1>Update ticket</h1>

      {/* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */}
      <Formik
        // initial values for the ticket form object
        initialValues={{ ...ticket }}
        // validate the ticket form object otherwise it will not submit until all validations is completed
        validate={validate}
        // complete your transaction you want to do when user successfully filled out the form correctly
        // submit the ticket form object to redux to PATCH SS the edited ticket object & if successful update the redux tickets store too
        onSubmit={(ticketObject: ticket_type) => {
          console.log(ticketObject);
          console.log(333);

          // if user assigned guest as 'guest', than capitalise first letter
          if (ticketObject.assigned_user === "guest") {
            ticketObject.assigned_user = "Guest";
          }

          // PATCH edited ticket to ss psql & if successful update than include updated ticket to redux tickets store too
          // using redux action to complete the task
          dispatch(patch_updateTicket_actions(ticketObject))
            .then((res) => {
              if (res.type === "patch/updateATicket/rejected") {
                catchHandlerForReduxSlices(
                  "patch_updateTicket_actions",
                  "EditTicket_form.tsx",
                  res
                );

                // close edit form modal
                closeModal_function(false);

                // display a toast message to user that update form was not successful
                // using my custom react bootstrap toast action creator
                dispatch(
                  messageToast_actions(
                    "Error occured, please refresh the page and try again!"
                  )
                );
              } //END if statement patch/updateTicket/rejected

              // succeed in updating the ticket on SS psql database
              if (res.type === "patch/updateATicket/fulfilled") {
                // close modal
                closeModal_function(false);

                // display a toast message to user that update form was successful
                dispatch(messageToast_actions("Update was successful."));
              }
            }) //END thenable handler for dispatch( patch_updateTicket_actions())
            .catch((err) => {
              catchHandlerForReduxSlices(
                "patch_updateTicket_actions",
                "EditTicket_form.tsx",
                err
              );

              // close modal
              closeModal_function(false);

              // display a toast message to user that update form was not successful
              // using my custom react bootstrap toast action creator
              dispatch(
                messageToast_actions(
                  "Error occured, please refresh the page and try again!"
                )
              );
            }); //END catchable handler for dispatch( patch_updateTicket_actions())
        }} //END Formik onSubmit props function
      >
        {/* <Formik> component is like a react context api & that it passes formikProps which gives you access to numerous of props to use such as errors / touched / values etc... */}
        {(formikProps) => (
          <Form>
            <Modal.Body>
              <label htmlFor="editTitle">Title *</label>
              {/* <Field/> is like input[type] element but is connected to formik component */}
              <Field
                type="text"
                id="editTitle"
                name="title"
                placeholder={ticket.title ? ticket.title : "Ticket title"}
              />

              {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
              {formikProps.errors.title && formikProps.touched.title ? (
                <div>{formikProps.errors.title}</div>
              ) : null}

              <div></div>

              <label htmlFor="editDescription">Description *</label>
              <Field
                type="text"
                id="editDescription"
                name="description"
                placeholder={
                  ticket.description ? ticket.description : "Ticket description"
                }
              />

              {formikProps.errors.description &&
              formikProps.touched.description ? (
                <div>{formikProps.errors.description}</div>
              ) : null}

              <div></div>

              <div role="group" aria-labelledby="priority-radio-group">
                Priority *:
                <label>
                  <Field
                    type="radio"
                    name="priority"
                    value="High"
                    checked={autoCheckPriority("High")}
                    // checked={true}
                  />
                  High
                </label>
                <label>
                  <Field
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={autoCheckPriority("Medium")}
                  />
                  Medium
                </label>
                <label>
                  <Field
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={autoCheckPriority("Low")}
                  />
                  Low
                </label>
              </div>

              {formikProps.errors.priority && formikProps.touched.priority ? (
                <div>{formikProps.errors.priority}</div>
              ) : null}

              <div></div>

              <label htmlFor="editAssignedUser">Assigned user</label>
              <Field
                type="text"
                id="editAssignedUser"
                name="assigned_user"
                placeholder={
                  ticket.assigned_user
                    ? ticket.assigned_user
                    : "Ticket assigned user"
                }
              />

              <div></div>

              <label htmlFor="editAppName">App Name *</label>
              <Field
                type="text"
                id="editAppName"
                name="app_name"
                placeholder={
                  ticket.app_name ? ticket.app_name : "Ticket app name"
                }
              />

              {formikProps.errors.app_name && formikProps.touched.app_name ? (
                <div>{formikProps.errors.app_name}</div>
              ) : null}

              <div></div>

              <label htmlFor="editAppVersion">App version *</label>
              <Field
                type="text"
                id="editAppVersion"
                name="app_version"
                placeholder={
                  ticket.app_version ? ticket.app_version : "ticket app version"
                }
              />

              {formikProps.errors.app_version &&
              formikProps.touched.app_version ? (
                <div>{formikProps.errors.app_version}</div>
              ) : null}

              <div></div>

              {/* only admin can see & change the submitted_by property when editing the ticket */}
              {(() => {
                if (auth0UserObject.email === process.env.ADMIN_EMAIL) {
                  return (
                    <>
                      <label htmlFor="editSubmittedBy">Submitted by</label>
                      <Field
                        type="text"
                        id="editSubmittedBy"
                        name="submitted_by"
                        placeholder={
                          ticket.submitted_by
                            ? ticket.submitted_by
                            : "Ticket submitted user"
                        }
                      />
                    </>
                  );
                }
                return null;
              })()}

              <div></div>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit">iK submit button</Button>
              <Button onClick={() => closeModal_function(false)}>Close</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </div>
  ); //END return jsx component
}
