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
