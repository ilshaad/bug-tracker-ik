const psqlDb = require("../../database/db");
const createDOMPurify = require("dompurify");
// dompurify requies jsdom for it to work on the serverside
const { JSDOM } = require("jsdom");

// setup the sanitizer function as recommended
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * admin-editable can update the submitted_by & created_on
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 * * CS must json data of the ticket object
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
    created_on,
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

  // check if admin made changes to the submitted_by property from the CS
  let submitted_byC = "";
  // if submitted_by is not an empty string '' than admin (you) made changes on submitted_by from the CS
  if (submitted_by !== "") {
    const sanitizeSubmitted_by = DOMPurify.sanitize(submitted_by);

    submitted_byC = ` submitted_by = '${sanitizeSubmitted_by}',`;
  }

  // check if admin made changes to the created_on property from the CS
  let created_onC = "";
  // if created_on is not an empty string '' than admin (you) made changes on created_on from the CS
  if (created_on !== "") {
    const sanitizeCreated_on = DOMPurify.sanitize(created_on);

    created_onC = `, created_on = '${sanitizeCreated_on}'`;
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
      msg: "error because falsy value occured within ticket_id / title / description / priority / assigned_user / status / app_name / app_version. Or admin with submitted_by / created_on",
    });
    return;
  }

  // sql query string to use for updating the psql tickets_table for the one specific ticket
  const sqlQuery = `UPDATE tickets_table SET title = '${titleC}', description = '${descriptionC}',${submitted_byC} priority = '${priorityC}', assigned_user = '${assigned_userC}', status = '${statusC}', app_name = '${app_nameC}', app_version = '${app_versionC}'${created_onC} WHERE ticket_id = '${ticket_idC}';`;
  console.log("🚀 ~ file: updateTicket.js ~ line 95 ~ sqlQuery", sqlQuery);

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
      res.status(400).json({
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
