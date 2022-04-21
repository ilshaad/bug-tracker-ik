const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

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
