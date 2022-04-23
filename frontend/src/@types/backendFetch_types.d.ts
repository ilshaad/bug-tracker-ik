export type userSignup_type = {
  user_id: string;
  email: string;
  name: string;
  role: string;
  created_on: string;
};

export interface createTicket_type {
  title: string;
  description: string;
  submitted_by: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
  ticket_id: string;
  created_on: string;
}

export interface updateTicket_type {
  ticket_id: string;
  title: string;
  description: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
  // only admin can make theses changes
  submitted_by: string;
  created_on: string;
}

export interface comment_type {
  comment_id: string;
  text_comment: string;
  // only admin can update below when updating
  created_on: string;
  ticket_id: string;
  name: string;
  email: string;
}

// export interface updateComment_type {
//   comment_id: string;
//   text_comment: string;
//   // only admin can make these changes
//   ticket_id: string;
//   name: string;
//   email: string;
//   created_on: string;
// }
