const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * Also delete comments related to that ticket_id within psql comments_table
 * * requires ticket_id params & ticket_id json property from client to know which ticket & comments to delete
 */
exports.deleteTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket & comments to delete
  const ticketId = req.params.ticketid;

  // sanitize incoming params
  const ticketIdC = DOMPurify.sanitize(ticketId);

  // json data sendf by the client which contains the ticket_id to be deleted
  const { ticket_id } = req.body;

  // sanitize incoming request
  const ticket_idC = DOMPurify.sanitize(ticket_id);

  // check that params & user json data ticket_id are matching, otherwise return error
  if (ticketIdC !== ticket_idC) {
    res.status(400).json({
      success: false,
      msg: "error because params & json data ticket_id are not matching",
    });
    return;
  }

  // sql query string to use to delete a ticket & all the comments related to that single ticket within both the psql tickets_table & comments_table
  const sqlQuery = `BEGIN TRANSACTION; DELETE FROM tickets_table WHERE ticket_id = '${ticket_idC}'; DELETE FROM comments_table WHERE ticket_id = '${ticket_idC}'; COMMIT;`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when deleting database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket & comments did not delete, & inform client
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        msg: "error occured when deleting ticket or comments within the database",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: `successfully deleted ticket & all comments with ticket id of '${ticket_idC}'`,
    });
  });
}; //END deleteTicket controller
