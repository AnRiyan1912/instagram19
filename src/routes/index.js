const authRoutes = require("./auth");
const PostRoutes = require("./post");
const commentRoutes = require("./comment");
const routers = {
  authRoutes,
  PostRoutes,
  commentRoutes,
};

module.exports = routers;
