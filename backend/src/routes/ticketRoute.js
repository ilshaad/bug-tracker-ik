const ticketRoute = require("express").Router();

// importing ticket controllers
const {
  ticketList,
  ticketUpdate,
} = require("../controllers/ticketController.js");

// GET /api/ticket/list = get all tickets from psql tickets_table
ticketRoute.get("/list", ticketList);

// PATCH /api/ticket/:ticketid	= edit / update a specific bug ticket
ticketRoute.patch("/:ticketid", ticketUpdate);

module.exports = ticketRoute;
