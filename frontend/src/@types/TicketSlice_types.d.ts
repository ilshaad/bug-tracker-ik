// Define a type for the slice state
export interface TicketsState_type {
  ticket_id: string | null;
  title: string | null;
  description: string | null;
  submitted_by: string | null;
  priority: string | null;
  assigned_user: string | null;
  status: string | null;
  app_name: string | null;
  app_version: string | null;
  created_on: string | null;
}

export interface dictionary_ticketsState_type {
  [ticket_id: string]: TicketsState_type;
}
