// select form for comment sort option (newest or oldest)
// however it will only return true or false state for DisplayCommentList.tsx component to output the comments
// true = newest comment // false = oldest comment

import React, { FormEvent } from "react";
import { Container, Form } from "react-bootstrap";

type Props = {
  newestCommentFirst_state: boolean;
  setNewestCommentFirst_state: Function;
};

export default function Comment_sortOption_selectForm({
  newestCommentFirst_state,
  setNewestCommentFirst_state,
}: Props) {
  // newest or oldest comment onChange event
  const changeState = (event: FormEvent<HTMLSelectElement>) => {
    // if value is oldest, then set state to false
    if (event.currentTarget.value === "oldest") {
      setNewestCommentFirst_state(false);
    }
    // if value is newest, then set state to true
    else if (event.currentTarget.value === "newest") {
      setNewestCommentFirst_state(true);
    }
  };

  // set the defaultValue for the select option
  let currentSortOption: string;
  if (newestCommentFirst_state === true) {
    currentSortOption = "newest";
  } else {
    currentSortOption = "oldest";
  }

  return (
    <Form>
      <Form.Group>
        <Form.Select
          defaultValue={currentSortOption}
          onChange={changeState}
          size="sm"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
