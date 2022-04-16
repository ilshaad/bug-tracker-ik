import backendApi_fetchInstance from "./backendApi_fetchInstance";
import catchHandler from "./backendCatchHandler";

/**exported controllers on this file:
 */
// get_allCommentsForASingleTicket,
// post_createComment,
// patch_updateComment,
// delete_deleteComment,

/**
 * * receive all comments for the one ticket
 * returns promise object with all the comments for one ticket
 *
 * Backend api:
 * GET /api/comment/:ticketid
 * get all the comments for a specific ticket within the comments_table when displaying a specific ticket on the clientside
 * * CS needs to provide ticket_id query parameters within the url
 */
export const get_allCommentsForASingleTicket = (ticketId: string) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .get(`/api/comment/${ticketId}`, {
      data: { ticketId },
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
// post_createComment,
// patch_updateComment,
// delete_deleteComment,
