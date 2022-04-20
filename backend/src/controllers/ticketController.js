const psqlDb = require("../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");
const { sanitize } = require("dompurify");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

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

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * only the admin can update the submitted_by
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 */
exports.updateTicket = (req, res) => {
  // collect the ticket_id number from params to identify which ticket to update
  const ticketId = req.params.ticketid;

  // sanitize incoming params
  const ticketIdC = DOMPurify.sanitize(ticketId);

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
  } = req.body;

  // sanitize incoming request
  const ticket_idC = DOMPurify.sanitize(ticket_id);
  const titleC = DOMPurify.sanitize(title);
  const descriptionC = DOMPurify.sanitize(description);
  const priorityC = DOMPurify.sanitize(priority);
  const assigned_userC = DOMPurify.sanitize(assigned_user);
  const statusC = DOMPurify.sanitize(status);
  const app_nameC = DOMPurify.sanitize(app_name);
  const app_versionC = DOMPurify.sanitize(app_version);

  // check that params & user json data ticket_id are matching, otherwise return error
  if (ticketIdC !== ticket_idC) {
    res.status(400).json({
      success: false,
      msg: "error because params & json data ticket_id are not matching",
    });
    return;
  }

  // admin updated the submitted_by property or not
  let submitted_byC = "";

  // if submitted_by is not 'null' (string) than admin (you) has changed this with a value with a any email
  if (submitted_by !== "") {
    const sanitizeSubmitted_by = DOMPurify.sanitize(submitted_by);

    submitted_byC = ` submitted_by = '${sanitizeSubmitted_by}',`;
  }

  // check client request data has no falsy values
  if (
    !ticket_idC ||
    !titleC ||
    !descriptionC ||
    !priorityC ||
    !assigned_userC ||
    !statusC ||
    !app_nameC ||
    !app_versionC
  ) {
    res.status(400).json({
      success: false,
      msg: "error because falsy value occured within ticket_id / title / description / priority / assigned_user / status / app_name / app_version",
    });
    return;
  }

  // sql query string to use for updating the psql tickets_table for the one specific ticket
  const sqlQuery = `UPDATE tickets_table SET title = '${titleC}', description = '${descriptionC}',${submitted_byC} priority = '${priorityC}', assigned_user = '${assigned_userC}', status = '${statusC}', app_name = '${app_nameC}', app_version = '${app_versionC}' WHERE ticket_id = '${ticket_idC}';`;

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
        msg: "error occured when updating ticket within the database, or perhap ticket id does not exist",
        err,
      });
      return;
    }

    res.status(200).json({
      success: true,
      msg: `successful updated ticket id '${ticket_idC}' within the database`,
    });
  });
}; //END updateTicket controller

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

  // sanitize incoming request
  const ticket_idC = DOMPurify.sanitize(ticket_id);
  const titleC = DOMPurify.sanitize(title);
  const descriptionC = DOMPurify.sanitize(description);
  const submitted_byC = DOMPurify.sanitize(submitted_by);
  const priorityC = DOMPurify.sanitize(priority);
  const assigned_userC = DOMPurify.sanitize(assigned_user);
  const statusC = DOMPurify.sanitize(status);
  const app_nameC = DOMPurify.sanitize(app_name);
  const app_versionC = DOMPurify.sanitize(app_version);
  const created_onC = DOMPurify.sanitize(created_on);

  // sql query string to use for creating a new ticket for psql tickets_table
  const sqlQuery = `INSERT INTO tickets_table (ticket_id, title, description, submitted_by, priority, assigned_user, status, app_name, app_version, created_on) VALUES ('${ticket_idC}', '${titleC}', '${descriptionC}', '${submitted_byC}', '${priorityC}', '${assigned_userC}', '${statusC}', '${app_nameC}', '${app_versionC}', '${created_onC}');`;

  psqlDb.query(sqlQuery, null, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "error occured when creating ticket within the database, perhaps ticket already exist",
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
      msg: `successfully created ticket with ticket id of '${ticket_idC}' within the database`,
    });
  });
}; //END createTicket controller
