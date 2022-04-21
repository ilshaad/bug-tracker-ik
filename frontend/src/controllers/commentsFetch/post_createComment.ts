import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";
import { v4 as uuidv4 } from "uuid";
import timeStamp from "../../helpers/timeStamp";
import { createComment_type } from "../../@types/backendFetch_types";

/**
 * * User creates a comment for a ticket
 * returns promise object with confirmation that it inserted comment within the database related to the ticket
 *
 * Backend api:
 * POST /api/comment/create
 * create a new comment for a specific ticket
 * * CS needs to provide json data of the newly comments for the psql comments_table
 */
// post_createComment
export default (commentObject: createComment_type) => {
  const uuid = uuidv4();

  // create timestamp
  const currentTimestamp = timeStamp();

  return backendApi_fetchInstance()
    .post(`/api/comment/create`, {
      ...commentObject,
      comment_id: uuid,
      created_on: currentTimestamp,
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(currentTimestamp);
      catchHandler(error);
    });
};
/**fetch example
    const commentObject: createComment_type = {
      comment_id: "456",
      ticket_id: "456",
      name: "create comment",
      email: "createComment@mail.com",
      text_comment: "create comment",
    };

    post_createComment(commentObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/
