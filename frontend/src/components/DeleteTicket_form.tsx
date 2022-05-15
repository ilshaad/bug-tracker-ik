// display the delete form text box for the user to type the ticket title to confirm for deletion
// using Formik

import { Field, Form, Formik, FormikErrors } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../models/hooks";

type Props = { closeModal_function: Function };

export default function DeleteTicket_form({ closeModal_function }: Props) {
  // collect the single ticket to update
  const ticketId_params = useParams().ticketid;
  const ticket = useAppSelector((state) => state.tickets[ticketId_params!]);

  type ticketTitle = { title: string };

  // form validation,for if user incorrectly mistype within the form
  // Used within Formik component for validation
  const validate = (values: ticketTitle) => {
    const errors: FormikErrors<ticketTitle> = {};

    if (!values.title) {
      errors.title = "Required";
    }
    // else if (values.title.length === 0) {
    //   errors.title = "Must be 1 characters or more";
    // }

    console.log(
      "🚀 ~ file: CreateTicketForm.tsx ~ line 19 ~ validate ~ errors",
      errors
    );

    return errors;
  }; //END validate method function

  // return formik jsx component
  return (
    <div>
      <h1>delete ticket</h1>

      {/* Most of these code were collect in Formik documentation & I modified it to work the way I need it to */}
      <Formik
        // initial values for the ticket form object
        initialValues={{ title: "" }}
        // validate the ticket form object otherwise it will not submit until all validations is completed
        validate={validate}
        // complete your transaction you want to do when user successfully filled out the form correctly
        // submit the ticket form object to redux to POST SS the newly created ticket object & if successful update the redux tickets store too
        onSubmit={(ticketObject: ticketTitle) => {
          // if assigned_user property is empty string than put 'Unassigned' as default value as no one is assigned to the ticket yet
          // if (ticketObject.assigned_user === "") {
          //   ticketObject.assigned_user = "Unassigned";
          // }
          // // only the admin can change the submitted_by property
          // // if empty string than user auth0 nickname will become default value
          // if (ticketObject.submitted_by === "") {
          //   ticketObject.submitted_by = auth0UserObject.nickname;
          // }
          // // POST created ticket to ss psql & if successful than include new ticket to redux tickets store too
          // // using redux action to complete the task
          // dispatch(post_createTicket_actions(ticketObject))
          //   .then((res) => {
          //     // failed to create ticket on the server psql database
          //     if (res.type === "post/createTicket/rejected") {
          //       catchHandlerForReduxSlices(
          //         "post_createdTicket_actions",
          //         "CreatedTicketForm.tsx",
          //         res
          //       );
          //       // navigate to dashboard with failed message
          //       navigate("/");
          //       // trigger message toast on the dashboard route of failed create ticket
          //       dispatch(
          //         messageToast_actions(
          //           "Unfortunately ticket was not created, refresh the page and try again please."
          //         )
          //       );
          //     }
          //     // succeeded to create ticket on the server psql database
          //     if (res.type === "post/createTicket/fulfilled") {
          //       // navigate to dashboard with success message
          //       navigate("/");
          //       // trigger message toast on the dashboard route of success create ticket
          //       dispatch(
          //         messageToast_actions("Successfully created a new ticket.")
          //       );
          //     }
          //   })
          //   .catch((err) => {
          //     catchHandlerForReduxSlices(
          //       "post_createdTicket_actions",
          //       "CreatedTicketForm.tsx",
          //       err
          //     );
          //     // navigate to dashboard with failed message
          //     navigate("/");
          //     // trigger message toast on the dashboard route of failed create ticket
          //     dispatch(
          //       messageToast_actions(
          //         "Unfortunately ticket was not created, refresh the page and try again please."
          //       )
          //     );
          //   });
        }} //END onSubmit props
      >
        {/* <Formik> component is like a react context api & that it passes formikProps which gives you access to numerous of props to use such as errors / touched / values etc... */}
        {(formikProps) => (
          <Form>
            <Modal.Body>
              <label htmlFor="deleteTitle">Title *</label>
              {/* <Field/> is like input[type] element but is connected to formik component */}
              <Field
                type="text"
                id="deleteTitle"
                name="title"
                placeholder="Enter the ticket title name for deletion"
              />

              {/* this will display jsx error message if user leaves text box empty or incorrectly types something (accordingly to your validate function) */}
              {formikProps.errors.title && formikProps.touched.title ? (
                <div>{formikProps.errors.title}</div>
              ) : null}
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button onClick={() => closeModal_function(false)}>Close</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </div>
  ); //END return jsx component
}
