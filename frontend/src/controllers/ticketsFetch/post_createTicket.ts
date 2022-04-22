import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";
import { createTicket_type } from "../../@types/backendFetch_types";
import { v4 as uuidv4 } from "uuid";
import timeStamp from "../../helpers/timeStamp";

/**
 * * Create a new ticket
 * returns promise object with confirmation
 * this function is wrapped in redux acion (post_createTicket_actions) which will our newTicket argument, including ticket_id & created_on
 *
 * Backend api:
 * POST /api/ticket/create
 * create a new ticket within the psql tickets_table
 * * client must send full list key value pair for creating new ticket
 */
// post_createTicket
export default (newTicket: createTicket_type) => {
  return backendApi_fetchInstance()
    .post("/api/ticket/create", { ...newTicket })
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
      title: "client create",
      description: "client create",
      submitted_by: "client create",
      priority: "high",
      assigned_user: "client create",
      status: "client create",
      app_name: "client create",
      app_version: "client create",
    };

    post_createTicket(createTicketObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/
