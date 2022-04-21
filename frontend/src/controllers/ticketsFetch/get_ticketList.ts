import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";

/**
 * * Get all ticket list
 * returns promise object with ticket list data
 *
 * Backend api:
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
// get_ticketList
export default () => {
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
    get_ticketList()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/
