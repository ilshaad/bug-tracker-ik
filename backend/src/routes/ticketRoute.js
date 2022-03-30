const ticketRoute = require("express").Router();

// importing ticket controllers
const {
  ticketList,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController.js");

/**
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
ticketRoute.get("/list", ticketList);

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * requires ticketid params & ticket_id json property from client to know which ticket to edit
 */
ticketRoute.patch("/:ticketid", updateTicket);

/**
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * requires ticket_id params & ticket_id json property from client to know which ticket to delete
 */
ticketRoute.delete("/:ticketid", deleteTicket);

module.exports = ticketRoute;
