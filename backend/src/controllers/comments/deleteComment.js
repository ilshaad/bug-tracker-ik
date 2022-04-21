const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * DELETE /api/comment/delete
 * user delete their comment
 * * CS must provide json data of comment_id
 */
exports.deleteComment = (req, res) => {
  // json data send by the client which contains the comment_id to be deleted
  const { comment_id } = req.body;

  // sanitize incoming request
  const comment_idC = DOMPurify.sanitize(comment_id);

  const sqlQuery = `DELETE FROM comments_table WHERE comment_id = '${comment_idC}';`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when deleting comment within the database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql comment did not delete, & inform client
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when deleting comment within the database, perhaps check your send data is correct",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successfully deleted comment within the database",
    });
  });
}; //END deleteComment
