const express = require("express");
const commentController = require("../controllers/commentController");

const route = express.Router();

route.get(
  "/getallcomment/:post_id",
  commentController.getAllComment.bind(commentController)
);
route.post("/createComment", commentController.create.bind(commentController));

module.exports = route;
