// Comment textarea box with submit & cancel button
// - also does validation
// Using React-bootstrap / Formik / Yum
// Similar to Formik but React-bootstrap does most of the styles for you
// - collected & modified from React-bootstrap doc under form validaion section

import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

type Props = { setShowCreateCommentBox: Function; auth0UserObject: any };

export default function CreateNewCommentBox_textarea({
  setShowCreateCommentBox,
  auth0UserObject,
}: Props) {
  // handle validation from Yum
  const schema = yup.object().shape({
    createComment: yup
      .string()
      .required("iK optionally you can leave a invalid message to user here"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
      initialValues={{
        createComment: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        // return form jsx component
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            {/* is a controlled form */}
            <Form.Control
              as="textarea"
              name="createComment"
              value={values.createComment}
              onChange={handleChange}
              isInvalid={!!errors.createComment}
              placeholder="Enter comment"
            />
            {/* will display to user their input in the textarea is invalid */}
            <Form.Control.Feedback type="invalid">
              {errors.createComment}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Add comment</Button>
          <Button onClick={() => setShowCreateCommentBox(false)}>Cancel</Button>
        </Form>
      )}
    </Formik>
  );
}
