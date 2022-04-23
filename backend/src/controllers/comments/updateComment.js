const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * PATCH /api/comment/update
 * user edits their comments
 * EDITABLE text_comment by the user
 * ADMIN-EDITABLE ticket_id / name / email / created_on
 * * CS must provide json data of all the comment object
 */
exports.updateComment = (req, res) => {
  // json data send by the client which contains the comment_id & text_comment to be edited
  const { comment_id, text_comment, ticket_id, name, email, created_on } =
    req.body;

  // sanitize incoming request
  const comment_idC = DOMPurify.sanitize(comment_id);
  const text_commentC = DOMPurify.sanitize(text_comment);

  // check if admin made changes to the ticket_id property from the CS
  let ticket_idC = "";
  // if ticket_id is not an empty string '' than admin (you) made changes on ticket_id from the CS
  if (ticket_id !== "") {
    const sanitizeticket_id = DOMPurify.sanitize(ticket_id);

    ticket_idC = `, ticket_id = '${sanitizeticket_id}'`;
  }

  // check if admin made changes to the name property from the CS
  let nameC = "";
  // if name is not an empty string '' than admin (you) made changes on name from the CS
  if (name !== "") {
    const sanitizename = DOMPurify.sanitize(name);

    nameC = `, name = '${sanitizename}'`;
  }

  // check if admin made changes to the email property from the CS
  let emailC = "";
  // if email is not an empty string '' than admin (you) made changes on email from the CS
  if (email !== "") {
    const sanitizeemail = DOMPurify.sanitize(email);

    emailC = `, email = '${sanitizeemail}'`;
  }

  // check if admin made changes to the created_on property from the CS
  let created_onC = "";
  // if created_on is not an empty string '' than admin (you) made changes on created_on from the CS
  if (created_on !== "") {
    const sanitizecreated_on = DOMPurify.sanitize(created_on);

    created_onC = `, created_on = '${sanitizecreated_on}'`;
  }

  const sqlQuery = `UPDATE comments_table SET text_comment = '${text_commentC}'${ticket_idC}${nameC}${emailC}${created_onC} WHERE comment_id = '${comment_idC}';`;

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
      msg: `Successfully updated comment with comment id of '${comment_idC}' within the database`,
    });
  });
}; //END updateComment
