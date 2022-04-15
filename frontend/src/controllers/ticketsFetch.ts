import backendApi_fetchInstance from "./backendApi_fetchInstance";
import catchHandler from "./backendCatchHandler";

/**
 * * Get all ticket list
 * returns promise object with ticket list data
 *
 * Backend api:
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
export const get_ticketList = () => {
  return backendApi_fetchInstance()
    .get("/api/ticket/list")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
const dummyEmail: string = "v1@mail.com";

// post user login email & recieve user profile
post_getUserProfile(dummyEmail)
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
  });
*/

/**
 * * update a ticket
 * returns promise object with confirmation
 *
 * Backend api:
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 */
interface updateTicketProps {
  ticket_id: string;
  title: string;
  description: string;
  priority: string;
  assigned_user: string;
  status: string;
  app_name: string;
  app_version: string;
}

export const patch_updateTicket = (updateTicket: updateTicketProps) => {
  console.log(updateTicket);
  return backendApi_fetchInstance()
    .patch("/api/ticket/" + updateTicket.ticket_id, {
      ticket_id: updateTicket.ticket_id,
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
const dummyEmail: string = "v1@mail.com";

// post user login email & recieve user profile
post_getUserProfile(dummyEmail)
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(error);
  });
*/
