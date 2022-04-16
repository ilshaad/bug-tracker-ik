import backendApi_fetchInstance from "./backendApi_fetchInstance";
import {
  createTicket_type,
  updateTicket_type,
} from "../helpers/backendFetch_types";
import catchHandler from "./backendCatchHandler";

/**exported controllers on this file:
 * get_ticketList
 * post_createTicket
 * patch_updateTicket
 * delete_deleteTicket
 */

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
 * * Create a new ticket
 * returns promise object with confirmation
 *
 * Backend api:
 * POST /api/ticket/create
 * create a new ticket within the psql tickets_table
 * * client must send full list key value pair for creating new ticket
 */

export const post_createTicket = (newTicket: createTicket_type) => {
  console.log(newTicket);
  return backendApi_fetchInstance()
    .post("/api/ticket/create", {
      ...newTicket,
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
    const createTicketObject: createTicket_type = {
      ticket_id: "456",
      title: "client create",
      description: "client create",
      submitted_by: "client create",
      priority: "high",
      assigned_user: "client create",
      status: "client create",
      app_name: "client create",
      app_version: "client create",
      created_on: "2022-04-16",
    };

    post_createTicket(createTicketObject)
      .then((data) => {
        console.log(data);
      })
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
//  * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 */
// ! DELETE AFTER PIECES
// interface updateTicket_type {
//   ticket_id: string;
//   title: string;
//   description: string;
//   priority: string;
//   assigned_user: string;
//   status: string;
//   app_name: string;
//   app_version: string;
// }

export const patch_updateTicket = (updateTicket: updateTicket_type) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .patch("/api/ticket/" + updateTicket.ticket_id, {
      ...updateTicket,
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
    const updateTicketObject: updateTicket_type = {
      ticket_id: "77",
      title: "clientTitle",
      description: "clientDescription",
      priority: "high",
      assigned_user: "clientassigned",
      status: "resolve",
      app_name: "client app",
      app_version: "v1",
    };

    try {
      const response = await patch_updateTicket(updateTicketObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
*/

/**
 * * delete a ticket
 * returns promise object with confirmation
 *
 * Backend api:
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * Also delete comments related to that ticket_id within psql comments_table
 * * requires ticket_id params & ticket_id json property from client to know which ticket & comments to delete
 */
export const delete_deleteTicket = (ticket_id: string) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .delete(`/api/ticket/${ticket_id}`, {
      data: { ticket_id },
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
    const ticketId = "456";
    console.log(77);

    delete_ticket(ticketId)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/
