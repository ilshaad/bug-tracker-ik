import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";

/**
 * * receive all comments for the one ticket
 * returns promise object with all the comments for one ticket
 *
 * Backend api:
 * GET /api/comment/:ticketid
 * get all the comments for a specific ticket within the comments_table when displaying a specific ticket on the clientside
 * * CS needs to provide ticket_id query parameters within the url
 */
// get_allCommentsForASingleTicket
export default (ticketId: string) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .get(`/api/comment/${ticketId}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
    const ticketId = "049e7fd3-753c-4123-8df5-df3aab63d9d2";
    console.log(88);

    get_allCommentsForASingleTicket(ticketId)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/
