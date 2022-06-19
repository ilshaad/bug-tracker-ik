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
import React from "react";
import { useParams } from "react-router-dom";

import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import auth0User from "../scripts/auth0User";
import catchHandlerForReduxSlices from "../scripts/catchHandlerForReduxSlices";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import { patch_updateTicket_actions } from "../models/reducers/tickets_slice";
import "../styles/components/EditTicket_form.scss";
import { ticket_type } from "../types/tickets_type";

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

    return false;
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
    <div id="EditTicket-form-component">
      {/* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */}
      <Formik
        // initial values for the ticket form object
        initialValues={{ ...ticket }}
        // validate the ticket form object otherwise it will not submit until all validations is completed
        validate={validate}
        // complete your transaction you want to do when user successfully filled out the form correctly
        // submit the ticket form object to redux to PATCH SS the edited ticket object & if successful update the redux tickets store too
        onSubmit={(ticketObject: ticket_type) => {
          // console.log(ticketObject);
          // console.log(333);

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
                dispatch(messageToast_actions("Ticket update was successful."));
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
              <Container id="editTicket-form-container">
                {/* title input */}
                <Row className="editTicketForm">
                  <Col xs={12}>
                    <label htmlFor="editTitle">Title</label>
                    <span>*</span>
                  </Col>

                  {/* <Field/> is like input[type] element but is connected to formik component */}
                  <Col xs={12}>
                    <Field
                      type="text"
                      id="editTitle"
                      name="title"
                      placeholder={ticket.title ? ticket.title : "Ticket title"}
                      className="EditTicket_form-component-inputs form-control"
                    />
                  </Col>

                  {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
                  <Col xs={12}>
                    {formikProps.errors.title && formikProps.touched.title ? (
                      <div className="EditInputErrorResponse">
                        {formikProps.errors.title}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                {/* description textarea */}
                <Row className="mt-2">
                  <Col xs={12} className="editTicketForm">
                    <label htmlFor="editDescription">Description</label>
                    <span>*</span>
                  </Col>

                  <Col xs={12}>
                    <Field
                      as="textarea"
                      type="text"
                      id="editDescription"
                      name="description"
                      placeholder={
                        ticket.description
                          ? ticket.description
                          : "Ticket description"
                      }
                      className="EditTicket_form-component-inputs form-control"
                    />
                  </Col>

                  <Col xs={12}>
                    {formikProps.errors.description &&
                    formikProps.touched.description ? (
                      <div className="EditInputErrorResponse">
                        {formikProps.errors.description}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                {/* priority selected input */}
                <Row className="mt-2">
                  <Col xs={12} className="editTicketForm-selected">
                    <div>Priority</div>
                    <span>*</span>
                  </Col>

                  <Col xs={12}>
                    <Field
                      as="select"
                      name="priority"
                      className="EditTicket_form-component-inputs form-select"
                    >
                      <option value="High" selected={autoCheckPriority("High")}>
                        High
                      </option>
                      <option
                        value="Medium"
                        selected={autoCheckPriority("Medium")}
                      >
                        Medium
                      </option>
                      <option value="Low" selected={autoCheckPriority("Low")}>
                        Low
                      </option>
                    </Field>
                  </Col>

                  <Col xs={12}>
                    {formikProps.errors.priority &&
                    formikProps.touched.priority ? (
                      <div>{formikProps.errors.priority}</div>
                    ) : null}
                  </Col>
                </Row>

                {/* assigned_user input */}
                <Row className="mt-2">
                  <Col xs={12} className="editTicketForm">
                    <label htmlFor="editAssignedUser">Assigned user</label>
                  </Col>

                  <Col xs={12}>
                    <Field
                      type="text"
                      id="editAssignedUser"
                      name="assigned_user"
                      placeholder={
                        ticket.assigned_user
                          ? ticket.assigned_user
                          : "Ticket assigned user"
                      }
                      className="EditTicket_form-component-inputs form-control"
                    />
                  </Col>
                </Row>

                {/* app_name input */}
                <Row className="mt-2">
                  <Col xs={12} className="editTicketForm">
                    <label htmlFor="editAppName">App Name</label>
                    <span>*</span>
                  </Col>

                  <Col xs={12}>
                    <Field
                      type="text"
                      id="editAppName"
                      name="app_name"
                      placeholder={
                        ticket.app_name ? ticket.app_name : "Ticket app name"
                      }
                      className=" EditTicket_form-component-inputs form-control"
                    />
                  </Col>

                  <Col xs={12}>
                    {formikProps.errors.app_name &&
                    formikProps.touched.app_name ? (
                      <div className="EditInputErrorResponse">
                        {formikProps.errors.app_name}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                {/* app_version input */}
                <Row className="mt-2">
                  <Col xs={12} className="editTicketForm">
                    <label htmlFor="editAppVersion">App version</label>
                    <span>*</span>
                  </Col>

                  <Col xs={12}>
                    <Field
                      type="text"
                      id="editAppVersion"
                      name="app_version"
                      placeholder={
                        ticket.app_version
                          ? ticket.app_version
                          : "ticket app version"
                      }
                      className=" EditTicket_form-component-inputs form-control"
                    />
                  </Col>

                  <Col xs={12}>
                    {formikProps.errors.app_version &&
                    formikProps.touched.app_version ? (
                      <div className="EditInputErrorResponse">
                        {formikProps.errors.app_version}
                      </div>
                    ) : null}
                  </Col>
                </Row>

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
                          className="EditTicket_form-component-inputs"
                        />
                      </>
                    );
                  }
                  return null;
                })()}
              </Container>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" className="editTicket-form-modal-buttons">
                Submit
              </Button>
              <Button
                onClick={() => closeModal_function(false)}
                className="editTicket-form-modal-buttons bg-danger"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </div>
  ); //END return jsx component
}
