import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";

/**
 * * user delete their comment
 * returns promise object with confirmation delete was successful
 *
 * Backend api:
 * DELETE /api/comment/delete
 * user delete their comment
 * * CS must provide json data of comment_id
 */
// delete_deleteComment
export default (comment_id: string) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .delete(`/api/comment/delete`, { data: { comment_id } })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
    const comment_id = "456";

    delete_deleteComment(comment_id)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
*/
