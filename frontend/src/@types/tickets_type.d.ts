export interface ticket_type {
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

// create a dictionary using ticket_id for data structure within ticket slice reducer
export interface dictionary_ticketsState_type {
  [ticket_id: string]: ticket_type;
}

export interface createTicket_dispatch_type {
  title: string;
  description: string;
  submitted_by: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
  // ticket_id: string;
  // created_on: string;
}
