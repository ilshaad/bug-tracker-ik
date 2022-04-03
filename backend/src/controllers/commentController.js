const psqlDb = require("../database/db");

/**
 * GET /api/comment/:ticketid
 * get all the comments for a specific ticket within the comments_table when displaying a specific ticket on the clientside
 * * CS needs to provide ticket_id query parameters within the url
 */
exports.getAllCommentsForASingleTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket to collect the comments
  const ticketId = req.params.ticketid;

  const sqlQuery = `SELECT * FROM comments_table WHERE ticket_id = '${ticketId}';`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when getting comments from a specific ticket within the database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql comments might not exist
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when getting comments from a specific ticket. Perhaps check your ticketid query parameters",
        err,
      });
      return;
    }

    res.json({ success: true, data: result.rows });
  });
}; //END getAllCommentsForASingleTicket controller

/**
 * POST /api/comment/create
 * create a new comment for a specific ticket
 * * CS needs to provide json data of the newly comments for the psql comments_table
 */
exports.createComment = (req, res) => {
  // collect the json data from the request
  const { comment_id, ticket_id, name, email, text_comment, created_on } =
    req.body;

  const sqlQuery = `INSERT INTO comments_table (comment_id, ticket_id, name, email, text_comment, created_on) VALUES ('${comment_id}', '${ticket_id}', '${name}', '${email}', '${text_comment}', '${created_on}');`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating new comment with the database, perhaps check the send data again",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql comment did not create, & inform client
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating new comment withi the database, please check send json data is correct",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successfully created a new comment within the database",
    });
  });
}; //END createComment

/**
 * PATCH /api/comment/update
 * user edits their comments
 * only text_comment is ediable by the user
 * * CS must provide json data of comment_id & text_comment of the user
 */
exports.updateComment = (req, res) => {
  // json data send by the client which contains the comment_id & text_comment to be edited
  const { comment_id, text_comment } = req.body;

  const sqlQuery = `UPDATE comments_table SET text_comment = '${text_comment}' WHERE comment_id = '${comment_id}';`;

  // const sqlQuery = "SELECT * FROM comments_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when updating comment within the database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql comment did not update, & inform client
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        msg: "error occured when updating comment within database",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successful comment update to the database",
    });
  });
}; //END updateComment

/**
 * DELETE /api/comment/delete
 * user delete their comment
 * *CS must provide json data of comment_id
 */
exports.deleteComment = (req, res) => {
  // json data send by the client which contains the comment_id to be deleted
  const { comment_id } = req.body;

  const sqlQuery = `DELETE FROM comments_table WHERE comment_id = '${comment_id}';`;

  // const sqlQuery = "SELECT * FROM comments_table;";

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
