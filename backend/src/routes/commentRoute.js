const commentRoute = require("express").Router();

// importing comment controllers
const {
  getAllCommentsForASingleTicket,
} = require("../controllers/comments/getAllCommentsForASingleTicket");
const { createComment } = require("../controllers/comments/createComment");
const { updateComment } = require("../controllers/comments/updateComment");
const { deleteComment } = require("../controllers/comments/deleteComment");

/**
 * GET /api/comment/:ticketid
 * get all the comments for a specific ticket within the comments_table when displaying a specific ticket on the clientside
 * * CS needs to provide ticket_id query parameters within the url
 */
commentRoute.get("/:ticketid", getAllCommentsForASingleTicket);

/**
 * POST /api/comment/create
 * create a new comment for a specific ticket
 * * CS needs to provide json data of the newly comments for the psql comments_table
 */
commentRoute.post("/create", createComment);

/**
 * PATCH /api/comment/update
 * user edits their comments
 * EDITABLE text_comment by the user
 * ADMIN-EDITABLE ticket_id / name / email / created_on
 * * CS must provide json data of comment_id & text_comment of the user
 */
commentRoute.patch("/update", updateComment);

/**
 * DELETE /api/comment/delete
 * user delete their comment
 * * CS must provide json data of comment_id
 */
commentRoute.delete("/delete", deleteComment);

module.exports = commentRoute;
