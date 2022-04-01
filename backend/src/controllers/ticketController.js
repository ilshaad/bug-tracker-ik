const psqlDb = require("../database/db");

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
    }
    res.json({ success: true, data: result.rows });
  });
}; //END getTicketList controller

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
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

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
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
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * * requires ticket_id params & ticket_id json property from client to know which ticket to delete
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

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when deleting database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket did not delete, & inform client
    if (result.rowCount === 0) {
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
  });
}; //END deleteTicket controller

/**
 * POST /api/ticket/create
 * create a new ticket within the psql tickets_table
 * * client must send full list key value pair for creating new ticket
 */
exports.createTicket = (req, res) => {
  // json data send by the client which contains all the editable properties that wil get updated
  const {
    ticket_id,
    title,
    description,
    submitted_by,
    priority,
    assigned_user,
    status,
    app_name,
    app_version,
    created_on,
  } = req.body;

  // sql query string to use for creating a new ticket for psql tickets_table
  const sqlQuery = `INSERT INTO tickets_table (ticket_id, title, description, submitted_by, priority, assigned_user, status, app_name, app_version, created_on) VALUES ('${ticket_id}', '${title}', '${description}', '${submitted_by}', '${priority}', '${assigned_user}', '${status}', '${app_name}', '${app_version}', '${created_on}');`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating ticket within the database",
        err,
      });
      return;
    }

    // if result.rowcount is 0 than it means psql ticket did not create, & inform client
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        msg: "error occured when creating ticket within the database",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: "successful ticket create within the database",
    });
  });
}; //END createTicket controller
