// Form component for /createticket route when user wants to create a new ticket
// Used Formik package to create the form for a new ticket, & when submitted it will be passed the newly created ticket object to redux actions to post the new ticket on the server & if successful it will also update redux tickets store
// user will be send to the newly ticket route if ticket was creted successfully

import { Field, Form, Formik, FormikErrors } from "formik";
import React from "react";

import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import auth0User from "../scripts/auth0User";
import catchHandlerForReduxSlices from "../scripts/catchHandlerForReduxSlices";
import { useAppDispatch } from "../models/hooks";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import { post_createTicket_actions } from "../models/reducers/tickets_slice";
import "../styles/components/CreateTicket_form.css";
import { createTicket_dispatch_type } from "../types/tickets_type";

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
    } else if (
      values.priority !== "High" &&
      values.priority !== "Medium" &&
      values.priority !== "Low"
    ) {
      errors.priority = "Required";
    }

    if (!values.status) {
      errors.status = "Required";
    } else if (values.status !== "Pending" && values.status !== "Resolved") {
      errors.status = "Required";
    }

    if (!values.app_name) {
      errors.app_name = "Required";
    }

    if (!values.app_version) {
      errors.app_version = "Required";
    }

    // console.log(
    //   "🚀 ~ file: CreateTicketForm.tsx ~ line 19 ~ validate ~ errors",
    //   errors
    // );

    return errors;
  }; //END validate method function

  // <div>
  //   <h1>create new ticket</h1>

  {
    /* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */
  }

  // return formik jsx component
  return (
    <Formik
      // id="CreateTicket_form"
      // initial values for the ticket form object
      initialValues={{
        title: "",
        description: "",
        priority: "",
        assigned_user: "", // default to Unassigned if user types nothing
        status: "",
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
              navigate("/#top");

              // trigger message toast on the dashboard route of failed create ticket
              dispatch(
                messageToast_actions(
                  "Unfortunately ticket was not created, refresh the page and try again please."
                )
              );
            }

            // succeeded to create ticket on the server psql database
            if (res.type === "post/createTicket/fulfilled") {
              // navigate to newly created ticket with success message
              navigate(`/viewticket/${res.payload.ticket_id}#top`);

              // trigger message toast on the dashboard route of success create ticket
              dispatch(
                messageToast_actions("Successfully created the ticket.")
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
            navigate("/#top");

            // trigger message toast on the dashboard route of failed create ticket
            dispatch(
              messageToast_actions(
                "Unfortunately ticket was not created, please refresh the page and try again."
              )
            );
          });
      }}
    >
      {/* <Formik> component is like a react context api & that it passes formikProps which gives you access to numerous of props to use such as errors / touched / values etc... */}
      {(formikProps) => (
        <Form id="CreateTicket_form" className={`w-100 g-2`}>
          <Container>
            {/* title input */}
            <Row
              className="textInputForm mx-auto mb-1 mb-lg-4"
              id="createTicketRowTitle"
            >
              <Col
                xs={12}
                sm={3}
                md={2}
                lg={2}
                id={`createTicket_title_Col_container`}
              >
                <label htmlFor="createTitle" className={`form-label`}>
                  Title
                </label>
                &#160;
                <span>*</span>
              </Col>

              <Col
                xs={12}
                sm={9}
                md={10}
                lg={10}
                // xl={10}
                className={`createTicket_titleField ms-auto `}
              >
                {/* <Field/> is like input[type] element but is connected to formik component */}
                <Field
                  type="text"
                  id="createTitle"
                  name="title"
                  placeholder="Give your ticket a title"
                  className={`CreateTicket_form-formInput form-control`}
                />
              </Col>

              <Col
                xs={12}
                sm={{ span: 9, offset: 3 }}
                md={{ span: 10, offset: 2 }}
                lg={{ span: 10, offset: 2 }}
                className={`createTicket_titleErrorMessageCol`}
              >
                {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
                {formikProps.errors.title && formikProps.touched.title ? (
                  <div className={`inputErrorResponse`}>
                    {formikProps.errors.title}
                  </div>
                ) : null}
              </Col>
            </Row>

            {/* description textarea input  */}
            <Row
              className="textInputForm mx-auto mb-1 mb-lg-4"
              id="createTicketRowDescription"
            >
              <Col xs={12}>
                <label htmlFor="createDescription" className="form-label">
                  Description
                </label>
                &#160;
                <span>*</span>
              </Col>

              <Col xs={12}>
                <Field
                  as="textarea"
                  type="text"
                  id="createDescription"
                  name="description"
                  placeholder="Describe the issue"
                  className={`CreateTicket_form-formInput form-control`}
                />
              </Col>

              <Col xs={12}>
                {formikProps.errors.description &&
                formikProps.touched.description ? (
                  <div className="inputErrorResponse">
                    {formikProps.errors.description}
                  </div>
                ) : null}
              </Col>
            </Row>

            {/* priority & status input together in Row because of responsive design */}
            <Row className="createTicketSelectForm-priorityNStatus mx-auto mb-1 mb-lg-4">
              {/* priority select input */}
              <Col
                // role="group"
                // aria-labelledby="priority-radio-group"
                className="createTicketHeading-priority"
                xs={12}
                md={{ order: 0, span: 6 }}
              >
                <div>Priority</div>
                &#160;
                <span>*</span>
              </Col>

              <Col xs={12} md={{ order: 2, span: 6 }}>
                <Field
                  as="select"
                  name="priority"
                  className="form-select CreateTicket_form-formInput createSelectPriority"
                >
                  <option selected>Select one</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Field>
              </Col>

              <Col xs={12} md={{ order: 4, span: 6 }}>
                {formikProps.errors.priority && formikProps.touched.priority ? (
                  <div className="inputErrorResponse">
                    {formikProps.errors.priority}
                  </div>
                ) : null}
              </Col>

              {/* status select input */}
              <Col
                className="createTicketHeading-status"
                xs={12}
                md={{ order: 1, span: 6 }}
              >
                <div>Status</div>
                &#160;
                <span>*</span>
              </Col>

              <Col xs={12} md={{ order: 3, span: 6 }}>
                <Field
                  as="select"
                  name="status"
                  className="form-select CreateTicket_form-formInput createSelectStatus"
                >
                  <option selected>Select one</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </Field>
              </Col>

              <Col xs={12} md={{ order: 5, span: 6 }}>
                {formikProps.errors.status && formikProps.touched.status ? (
                  <div className={`inputErrorResponse`}>
                    {formikProps.errors.status}
                  </div>
                ) : null}
              </Col>
            </Row>

            {/* assigned_user / app_name / app-version  input together in Row because of responsive design */}
            <Row className="createTicketSelectForm-assignedUserNAppNameNAppVersion mx-auto">
              {/* assigned_user input */}
              <Col
                xs={12}
                lg={{ span: 4, order: 1 }}
                className="createTicketHeading-assignedUser"
              >
                <label htmlFor="createAssignedUser" className={`form-label`}>
                  Assigned user
                </label>
              </Col>

              <Col xs={12} lg={{ span: 4, order: 4 }}>
                <Field
                  type="text"
                  id="createAssignedUser"
                  name="assigned_user"
                  placeholder="Unassigned"
                  className={`CreateTicket_form-formInput form-control`}
                />
              </Col>

              {/* app_name input */}
              <Col
                xs={12}
                lg={{ span: 4, order: 2 }}
                className="createTicketHeading-app_name"
              >
                <label htmlFor="createAppName">App Name</label>
                &#160;
                <span>*</span>
              </Col>

              <Col xs={12} lg={{ span: 4, order: 5 }}>
                <Field
                  type="text"
                  id="createAppName"
                  name="app_name"
                  placeholder="Name of the app"
                  className="CreateTicket_form-formInput form-control"
                />
              </Col>

              <Col
                xs={12}
                lg={{ span: 4, order: 7, offset: 4 }}
                id="app_nameErrorFlexOrder7"
              >
                {formikProps.errors.app_name && formikProps.touched.app_name ? (
                  <div className="inputErrorResponse">
                    {formikProps.errors.app_name}
                  </div>
                ) : null}
              </Col>

              {/* app_version input */}
              <Col
                xs={12}
                lg={{ span: 4, order: 3 }}
                className={`createTicketHeading-app_version`}
              >
                <label htmlFor="createAppVersion">App version</label>
                &#160;
                <span>*</span>
              </Col>

              <Col xs={12} lg={{ span: 4, order: 6 }} id="app_versionLgflex">
                <Field
                  type="text"
                  id="createAppVersion"
                  name="app_version"
                  placeholder="Version of the app"
                  className={`CreateTicket_form-formInput form-control`}
                />
              </Col>

              <Col
                xs={12}
                lg={{ span: 4, order: 8 }}
                id="app_versionErrorFlexOrder8"
              >
                {formikProps.errors.app_version &&
                formikProps.touched.app_version ? (
                  <div className="inputErrorResponse">
                    {formikProps.errors.app_version}
                  </div>
                ) : null}
              </Col>
            </Row>

            {/* submitted_by input */}
            {/* only admin can see & change the submitted_by property when creating a new ticket */}
            {(() => {
              if (auth0UserObject.email === process.env.ADMIN_EMAIL) {
                return (
                  <Row>
                    <Col>
                      <label htmlFor="createSubmittedBy">Submitted by</label>
                      <Field
                        type="text"
                        id="createSubmittedBy"
                        name="submitted_by"
                        placeholder="Only admin can see &amp; change submitted_by property when creating new ticket"
                        className="CreateTicket_form-formInput"
                      />
                    </Col>
                  </Row>
                );
              }
              return null;
            })()}

            {/* submit button */}
            <Row className="mt-3 mt-lg-4 mb-3 mb-lg-4 mx-auto">
              <Col xs={12} md={6} xl={4} className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="fw-bold"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  ); //END return jsx component
} //END CreateTicket_form
