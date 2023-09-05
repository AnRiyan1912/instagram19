const { authRoutes, PostRoutes, commentRoutes } = require("./routes");
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 2000;
const app = express();
app.use(express.json());
const db = require("./models/");
const cors = require("cors");
app.use(cors());

app.use("/auth", authRoutes);
app.use("/posts", PostRoutes);
app.use("/comment", commentRoutes);
app.use("/public/avatars", express.static(`${__dirname}/public/images/avatar`));
app.use("/public/posts", express.static(`${__dirname}/public/images/post`));
app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
  // db.sequelize.sync({ alter: true });
});
