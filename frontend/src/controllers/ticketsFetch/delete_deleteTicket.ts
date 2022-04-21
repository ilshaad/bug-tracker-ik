import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";

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
// delete_deleteTicket
export default (ticket_id: string) => {
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
