const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * GET /api/comment/:ticketid
 * get all the comments for a specific ticket within the comments_table when displaying a specific ticket on the clientside
 * * CS needs to provide ticket_id query parameters within the url
 */
exports.getAllCommentsForASingleTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket to collect the comments
  const ticketId = req.params.ticketid;

  // sanitize incoming request
  const ticketIdC = DOMPurify.sanitize(ticketId);

  const sqlQuery = `SELECT * FROM comments_table WHERE ticket_id = '${ticketIdC}';`;

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
        msg: "error occured when getting comments from a specific ticket. Perhaps check your ticketid values",
        err,
      });
      return;
    }

    res.json({ success: true, data: result.rows });
  });
}; //END getAllCommentsForASingleTicket controller
