const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * POST /api/comment/create
 * create a new comment for a specific ticket
 * * CS needs to provide json data of the newly comments for the psql comments_table
 */
exports.createComment = (req, res) => {
  // collect the json data from the request
  const { comment_id, ticket_id, name, email, text_comment, created_on } =
    req.body;

  // sanitize incoming request
  const comment_idC = DOMPurify.sanitize(comment_id);
  const ticket_idC = DOMPurify.sanitize(ticket_id);
  const nameC = DOMPurify.sanitize(name);
  const emailC = DOMPurify.sanitize(email);
  const text_commentC = DOMPurify.sanitize(text_comment);
  const created_onC = DOMPurify.sanitize(created_on);

  const sqlQuery = `INSERT INTO comments_table (comment_id, ticket_id, name, email, text_comment, created_on) VALUES ('${comment_idC}', '${ticket_idC}', '${nameC}', '${emailC}', '${text_commentC}', '${created_onC}');`;

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
      msg: `Successfully created new comment related to ticket id of '${ticket_idC}' within the database`,
    });
  });
}; //END createComment
