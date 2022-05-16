export interface comment_type {
  comment_id: string;
  text_comment: string;
  // only admin can update below when updating
  created_on: string;
  ticket_id: string;
  name: string;
  email: string;
}

// create comment without comment_id & created_on
export interface createComment_dispatch_type {
  // comment_id: string;
  ticket_id: string;
  name: string;
  email: string;
  text_comment: string;
  // created_on: string;
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
