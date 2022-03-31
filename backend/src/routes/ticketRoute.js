const ticketRoute = require("express").Router();

// importing ticket controllers
const {
  getTicketList,
  updateTicket,
  deleteTicket,
  createTicket,
} = require("../controllers/ticketController.js");

/**
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
ticketRoute.get("/list", getTicketList);

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * requires ticketid params & ticket_id json property from client to know which ticket to edit
 */
ticketRoute.patch("/:ticketid", updateTicket);

/**
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * requires ticket_id params & ticket_id json property from client to know which ticket to delete
 */
ticketRoute.delete("/:ticketid", deleteTicket);

/**
 * POST /api/ticket/create
 * create a new ticket within the psql tickets_table
 * client must send full list key value pair for creating new ticket
 */
ticketRoute.post("/create", createTicket);

module.exports = ticketRoute;
