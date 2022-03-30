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
}; //END ticketList controller

/**
 * user edited tickets
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * requires ticket_id to identify ticket for editing
 */
exports.updateTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket to update
  const ticketId = req.params.ticketid;

  // json data send by the client which contains all the editable properties that wil get updated
  const {
    ticket_id,
    title,
    description,
    priority,
    assigned_user,
    status,
    app_name,
    app_version,
  } = req.body;

  // check that params & user json data ticket_id are matching, otherwise return error
  if (ticketId !== ticket_id) {
    res.status(400).json({
      success: false,
      msg: "error because params & json data ticket_id are not matching",
    });
    return;
  }

  // sql query string to use for updating the psql tickets_table for the one specific ticket
  const sqlQuery = `UPDATE tickets_table SET title = '${title}', description = '${description}', priority = '${priority}', assigned_user = '${assigned_user}', status = '${status}', app_name = '${app_name}', app_version = '${app_version}' WHERE ticket_id = '${ticket_id}';`;

  // const sqlQuery = "SELECT * FROM tickets_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: "error occured when updating database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket did not update, & inform client
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        msg: "error occured when updating ticket within the database",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successful ticket update within the database",
    });
  });
}; //END updateTicket controller

/**
 * user deletes a tickets
 * requires ticket_id to identify which ticket to be deleted
 */
exports.deleteTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket to delete
  const ticketId = req.params.ticketid;

  // json data sendf by the client which contains the ticket_id to be deleted
  const { ticket_id } = req.body;

  // check that params & user json data ticket_id are matching, otherwise return error
  if (ticketId !== ticket_id) {
    res.status(400).json({
      success: false,
      msg: "error because params & json data ticket_id are not matching",
    });
    return;
  }

  // sql query string to use to delete a ticket within the psql tickets_table
  const sqlQuery = `DELETE FROM tickets_table WHERE ticket_id = '${ticket_id}';`;

  // const sqlQuery = "SELECT * FROM tickets_table;";

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: "error occured when deleting database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket did not delete, & inform client
    if (result.rowCount === 0) {
      console.log(result.rowCount);
      res.status(500).json({
        success: false,
        msg: "error occured when deleting ticket within database",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successful ticket delete within the database",
    });

    // res.json({ success: true, data: result });
  });
}; //END deleteTicket controller
