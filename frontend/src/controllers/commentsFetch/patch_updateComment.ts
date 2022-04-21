import { updateComment_type } from "../../@types/backendFetch_types";
import backendApi_fetchInstance from "./../backendApi_fetchInstance";
import catchHandler from "./../backendCatchHandler";

/**
 * * user update their comment
 * returns promise object with confirmation update was successful
 *
 * Backend api:
 * PATCH /api/comment/update
 * user edits their comments
 * EDITABLE text_comment by the user
 * ADMIN-EDITABLE ticket_id / name / email / created_on
 * * CS must provide json data of comment_id & text_comment of the user
 */
// patch_updateComment
export default ({
  comment_id,
  text_comment,
  ticket_id,
  name,
  email,
  created_on,
}: updateComment_type) => {
  return backendApi_fetchInstance()
    .patch(`/api/comment/update`, {
      comment_id,
      text_comment,
      ticket_id,
      name,
      email,
      created_on,
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
    const comment_id = "456",
      text_comment = "update comment";

    patch_updateComment(comment_id, text_comment)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
*/
