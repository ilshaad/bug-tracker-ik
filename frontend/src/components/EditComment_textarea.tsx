// display edit textarea to update comment
// will only display when user clicks on the edit button, & hide when user users submits or closes the textarea

import { Formik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import catchHandlerForReduxSlices from "../helpers/catchHandlerForReduxSlices";
import { useAppDispatch } from "../models/hooks";
import { patch_updateComment_actions } from "../models/reducers/comments_slice";
import { messageToast_actions } from "../models/reducers/messageToast_slice";
import { comment_type } from "../types/comments_type";

type Props = {
  displayEditCommentBox: boolean;
  setDisplayEditCommentBox: Function;
  commentObject: comment_type;
};

export default function EditComment_textarea({
  displayEditCommentBox,
  setDisplayEditCommentBox,
  commentObject,
}: Props) {
  const dispatch = useAppDispatch();

  // handle validation from Yum
  const schema = yup.object().shape({
    editComment: yup.string().required("Comment is empty!"),
  });

  // return null until user or admin has clicked on the edit button to update comment
  if (!displayEditCommentBox) return null;

  // return textarea for user to update comment when they click on the edit button
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        editComment: commentObject.text_comment,
      }}
      onSubmit={(values) => {
        // setup edited commentObject
        const editedCommentObject: comment_type = commentObject;

        // update text comment on the comment object
        editedCommentObject.text_comment = values.editComment;

        // dispatch to update comment on ss psql
        dispatch(patch_updateComment_actions(editedCommentObject))
          .then((res) => {
            // if failure to update comment on ss psql
            if (res.type === "patch/updateComment/rejected") {
              catchHandlerForReduxSlices(
                "textarea onSubmit edit button",
                "EditComment_textarea.tsx",
                res
              );

              // close edit textarea
              setDisplayEditCommentBox(false);

              // tell user edit comment did not update with toast message
              dispatch(
                messageToast_actions(
                  "Unfortunately your comment was not updated. Please refresh the page and try again!"
                )
              );
            } //END if statement for rejected action creator

            // if successfully updated the ss psql server
            if (res.type === "patch/updateComment/fulfilled") {
              // close edit textarea
              setDisplayEditCommentBox(false);

              // tell user update comment was successful
              dispatch(messageToast_actions("Your comment has been updated!"));
            }
          }) //END thenable handler for dispatch patch_updateComment_actions
          .catch((err) => {
            // close edit textarea
            setDisplayEditCommentBox(false);

            // message toast
            dispatch(
              messageToast_actions(
                "Unfortunately your comment was not updated. Please refresh the page and try again!"
              )
            );

            // display error on console
            catchHandlerForReduxSlices(
              "catch handler on patch_updateComment_actions",
              "EditComment_textarea.tsx",
              err
            );
          }); //END catch handler for dispatch patch_updateComment_actions
      }} //END of onSubmit event handler
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
          <Form.Group style={{ position: "relative" }}>
            {/* is a controlled form */}
            <Form.Control
              as="textarea"
              name="editComment"
              value={values.editComment}
              onChange={handleChange}
              isInvalid={!!errors.editComment}
              placeholder="Enter comment"
              style={{ backgroundColor: "#f8f9fa" }}
            />
            {/* will display to user their input in the textarea is invalid */}
            <Form.Control.Feedback type="invalid">
              {errors.editComment}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-1">
            <Button type="submit" size="sm">
              Update comment
            </Button>
            <Button
              onClick={() => setDisplayEditCommentBox(false)}
              size="sm"
              className="bg-danger"
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
