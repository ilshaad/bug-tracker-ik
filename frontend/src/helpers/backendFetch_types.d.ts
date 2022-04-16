export type userSignup_type = {
  user_id: string;
  email: string;
  name: string;
  role: string;
  created_on: string;
};

export interface updateTicket_type {
  ticket_id: string;
  title: string;
  description: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
}

export interface createTicket_type {
  ticket_id: string;
  title: string;
  description: string;
  submitted_by: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
  created_on: string;
}
