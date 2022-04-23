const ticketRoute = require("express").Router();

// importing ticket controllers
const { getTicketList } = require("../controllers/tickets/getTicketList");
const { createTicket } = require("../controllers/tickets/createTicket");
const { updateTicket } = require("../controllers/tickets/updateTicket");
const { deleteTicket } = require("../controllers/tickets/deleteTicket");

/**
 * GET /api/ticket/list
 * get all tickets from psql tickets_table
 */
ticketRoute.get("/list", getTicketList);

/**
 * POST /api/ticket/create
 * create a new ticket within the psql tickets_table
 * * client must send full list key value pair for creating new ticket
 */
ticketRoute.post("/create", createTicket);

/**
 * PATCH /api/ticket/:ticketid
 * edit / update a specific bug ticket
 * editable only: title / description / priority / assigned_user / status / app_name / app_version
 * admin-editable can update the submitted_by & created_on
 * * requires ticketid params & ticket_id json property from client to know which ticket to edit
 * * CS must json data of the ticket object
 */
ticketRoute.patch("/:ticketid", updateTicket);

/**
 * DELETE /api/ticket/:ticketid
 * delete a singe ticket from psql tickets_table
 * Also delete comments related to that ticket_id within psql comments_table
 * only the admin can update the submitted_by
 * * requires ticket_id params & ticket_id json property from client to know which ticket & comments to delete
 */
ticketRoute.delete("/:ticketid", deleteTicket);

module.exports = ticketRoute;
