const express = require("express");
const postController = require("../controllers/postController");
const check_verified = require("../middleware/auth");
const route = express.Router();

route.get("/", postController.getAll.bind(postController));
route.get("/allpost", postController.getAllUserPost.bind(postController));
route.get("/search", postController.getSeacrhFilter.bind(postController));
route.get("/user/:userid", postController.getUserPost.bind(postController));

route.get("/:id", postController.getById.bind(postController));
route.delete(
  "/:id",
  check_verified,
  postController.deleteById.bind(postController)
);
route.patch(
  "/:id",
  check_verified,
  postController.updateById.bind(postController)
);
route.post("/", check_verified, postController.create.bind(postController));

module.exports = route;
