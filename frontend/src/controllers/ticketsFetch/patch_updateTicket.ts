import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";
import { updateTicket_type } from "../../@types/backendFetch_types";

/**
 * * update a ticket
 * returns promise object with confirmation
 *
 * Backend api:
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * admin-editable can update the submitted_by & created_on
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 * * CS must json data of the ticket object
 */
// patch_updateTicket
export default (updateTicket: updateTicket_type) => {
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
      submitted_by: "admin",
      created_on: "2022-04-21 11:58:00"
    };

    try {
      const response = await patch_updateTicket(updateTicketObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
*/
