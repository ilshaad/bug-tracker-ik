import backendApi_fetchInstance from "./backendApi_fetchInstance";
import { createComment_type } from "../@types/backendFetch_types";
import catchHandler from "./backendCatchHandler";

/**exported controllers on this file:
 * get_allCommentsForASingleTicket
 * post_createComment
 * patch_updateComment
 * delete_deleteComment
 */

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

/**
 * * User creates a comment for a ticket
 * returns promise object with confirmation that it inserted comment within the database related to the ticket
 *
 * Backend api:
 * POST /api/comment/create
 * create a new comment for a specific ticket
 * * CS needs to provide json data of the newly comments for the psql comments_table
 */
export const post_createComment = (commentObject: createComment_type) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .post(`/api/comment/create`, {
      ...commentObject,
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
    const commentObject: createComment_type = {
      comment_id: "456",
      ticket_id: "456",
      name: "create comment",
      email: "createComment@mail.com",
      text_comment: "create comment",
      created_on: "2022-04-17",
    };

    post_createComment(commentObject)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
*/

/**
 * * user update their comment
 * returns promise object with confirmation update was successful
 *
 * Backend api:
 * PATCH /api/comment/update
 * user edits their comments
 * only text_comment is ediable by the user
 * * CS must provide json data of comment_id & text_comment of the user
 */
export const patch_updateComment = (
  comment_id: string,
  text_comment: string
) => {
  // console.log(updateTicket);
  return backendApi_fetchInstance()
    .patch(`/api/comment/update`, { comment_id, text_comment })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      catchHandler(error);
    });
};
/**fetch example
    const comment_id = "456",
      text_comment = "update comment";

    patch_updateComment(comment_id, text_comment)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
*/

/**
 * * user delete their comment
 * returns promise object with confirmation delete was successful
 *
 * Backend api:
 * DELETE /api/comment/delete
 * user delete their comment
 * * CS must provide json data of comment_id
 */
export const delete_deleteComment = (comment_id: string) => {
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
