const psqlDb = require("../../database/db");

/**
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
exports.getTicketList = (req, res) => {
  const sqlQuery = "SELECT * FROM tickets_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error when fetching ticket list from database",
        err,
      });
      return;
    }
    res.json({ success: true, data: result.rows });
  });
}; //END getTicketList controller
