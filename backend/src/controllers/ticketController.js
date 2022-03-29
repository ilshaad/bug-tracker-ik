const psqlDb = require("../database/db");

// get all the ticket list from psql tickets_table
exports.ticketList = (req, res) => {
  const sqlQuery = "SELECT * FROM tickets_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: "error when fetching from database",
        err,
      });
    }
    res.json({ success: true, data: result.rows });
  });
};

exports.ticketUpdate = (req, res) => {
  //  zzzzzzzzzzzzzzzzzzzzzzzzzzzz
  res.json({ params: req.params });
};
