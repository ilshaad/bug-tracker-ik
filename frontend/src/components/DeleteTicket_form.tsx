// display the delete form text box for the user to type the ticket title to confirm for deletion
// using Formik
// if confirm by user, ticket will be deleted in ss psql & redux ticket store >> close the modal >> navigate to dashboard >> display toast message

import { Field, Form, Formik, FormikErrors, FormikProps } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import "../public/styles/components/DeleteTicket_form.scss";
import catchHandlerForReduxSlices from "../helpers/catchHandlerForReduxSlices";
import { useAppDispatch, useAppSelector } from "../models/hooks";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import { delete_deleteTicket_actions } from "../models/reducers/tickets_slice";

type Props = { closeModal_function: Function };

export default function DeleteTicket_form({ closeModal_function }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // boolean value to establish submit button as disable, & only true when user types the correct text in the textbox
  const [enableSubmitButton, setEnableSubmitButton] = useState<boolean>(false);

  // collect the single ticket to delete
  const ticketId_params = useParams().ticketid;
  const ticket = useAppSelector((state) => state.tickets[ticketId_params!]);

  const title_textBox = useState<string>("");

  type ticketTitle = { title: string };

  // establish the submit button for only when user types the correct text for deletion
  const submitButton = () => {
    // if user has typed the correct matching ticket title, return the enable submit button
    if (enableSubmitButton) {
      return (
        <Button
          type="submit"
          onClick={() => closeModal_function(false)}
          className="deleteTicket-form-modal-buttons"
        >
          Delete
        </Button>
      );
    }
    // if user mistyped the ticket title, return disable submit button
    else {
      return (
        <Button
          disabled
          type="submit"
          className="deleteTicket-form-modal-buttons"
        >
          Delete
        </Button>
      );
    }
  };

  // form validation,for if user incorrectly mistype within the form
  // Used within Formik component for validation
  const validate = (values: ticketTitle) => {
    const errors: FormikErrors<ticketTitle> = {};

    // error if empty string
    if (!values.title) {
      errors.title = "Required";
      setEnableSubmitButton(false);
    }
    // error if user input value does not match ticket title
    else if (values.title !== ticket.title) {
      errors.title = "Text does not match the ticket title";
      setEnableSubmitButton(false);
    }
    // if not error, that means user has typed the correct title input & you should set & return the enabled submit button
    else {
      setEnableSubmitButton(true);
    }

    return errors;
  }; //END validate method function

  // return formik jsx component
  return (
    <div id="DeleteTicket_form-component">
      {/* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */}
      <Formik
        // initial values for the ticket form object
        initialValues={{ title: "" }}
        // validate the ticket form object otherwise it will not submit until all validations is completed
        validate={validate}
        // complete your transaction you want to do when user successfully filled out the form correctly
        // submit the ticket form object to redux to POST SS the newly created ticket object & if successful update the redux tickets store too
        onSubmit={(ticketObject: ticketTitle) => {
          console.log(ticketObject);

          // DELETE ticket on ss psql, & if successful then delete on redux store ticket
          dispatch(delete_deleteTicket_actions(ticketId_params!))
            .then((res) => {
              // navigate to dashboard route page because the ticket viewpage will no longer exist
              navigate("/");

              // failed to delete ticket on ss psql
              if (res.type === "delete/deleteTicket/rejected") {
                catchHandlerForReduxSlices(
                  "delete/delete_deleteTicket_actions",
                  "DeleteTicket_form.tsx",
                  res
                );

                // trigger toast message that deletion of ticket failed
                dispatch(
                  messageToast_actions(
                    "Unfortunately ticket was not deleted, Please refresh the page and try again!"
                  )
                );
              }

              // successful delete of ticket on the psql
              if (res.type === "delete/deleteTicket/fulfilled") {
                // trigger toast message that deletion of ticket was a success
                dispatch(messageToast_actions("Successfully deleted ticket."));
              }
            }) //END thanable handler
            .catch((err) => {
              // navigate to dashboard route page because the ticket viewpage will no longer exist
              navigate("/");

              catchHandlerForReduxSlices(
                "delete/delete_deleteTicket_actions",
                "DeleteTicket_form.tsx",
                err
              );

              // trigger toast message that deletion of ticket failed
              dispatch(
                messageToast_actions(
                  "Unfortunately ticket was not deleted, refresh the page and try again please!"
                )
              );
            }); //END of catchable handler
        }} //END onSubmit props
      >
        {/* <Formik> component is like a react context api & that it passes formikProps which gives you access to numerous of props to use such as errors / touched / values etc... */}
        {(formikProps) => (
          <Form>
            <Modal.Body>
              <Container>
                {/* Explain user to type ticket title name to delete ticket */}
                <Row>
                  <h3>
                    Please type &quot;
                    {ticket ? (
                      <code className="text-secondary">{ticket.title}</code>
                    ) : null}
                    &quot; within the text box for delete confirmation.
                  </h3>
                </Row>

                <Row>
                  {/* delete title */}
                  {/* <Col xs={12} className="deleteTicket_form-titleHeading">
                    <label htmlFor="deleteTitle" className="form-label">
                      Title
                    </label>
                    <span>*</span>
                  </Col> */}

                  {/* <Field/> is like input[type] element but is connected to formik component */}
                  <Col xs={12}>
                    <Field
                      type="text"
                      id="deleteTitle"
                      name="title"
                      // placeholder="Enter the ticket title name for deletion"
                      className="form-control"
                    />
                  </Col>

                  {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
                  <Col xs={12}>
                    {formikProps.errors.title && formikProps.touched.title ? (
                      <div className="deleteInputErrorResponse">
                        {formikProps.errors.title}
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </Container>
            </Modal.Body>

            {/* submit & cancel buttons */}
            <Modal.Footer>
              {submitButton()}
              {/* <Button type="submit" onClick={() => closeModal_function(false)}>
                Submit
              </Button> */}

              <Button
                onClick={() => closeModal_function(false)}
                className="deleteTicket-form-modal-buttons bg-danger"
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
