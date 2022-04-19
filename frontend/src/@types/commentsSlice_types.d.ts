// type for collecting all comments for a single ticket
export interface comments_type {
  comment_id: string;
  ticket_id: string;
  name: string;
  email: string;
  text_comment: string;
  created_on: string;
}

/*
[
  {
    comment1
  }
  {
    comment2
  }
]

*/
