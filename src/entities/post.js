const db = require("../models");
const Entity = require("./entity");
const { Op } = db.Sequelize;
class Post extends Entity {
  constructor(model) {
    super(model);
  }
  getUserPost(req, res) {
    db.Post.findAll({
      include: { model: db.User, as: "users" },
      where: {
        user_id: req.params.userid,
      },
    })
      .then((result) => [res.status(200).send(result)])
      .catch((err) => {
        res.status(500).send(err?.message);
      });
  }
  getAllUserPost(req, res) {
    try {
      const limit = 2;
      const page = req.query.page;
      db.Post.findAll({
        include: { model: db.User, as: "users" },
        order: [["createdAt", "DESC"]],
        // offset: (page - 1) * limit,
        limit: 10,
      })
        .then((result) => res.send(result))
        .catch((err) => {
          res.send(err?.message);
        });
    } catch (err) {
      console.log(err?.message);
    }
  }
  getSeacrhFilter(req, res) {
    db.Post.findAll({
      include: {
        model: db.User,
        as: "users",
      },
      where: {
        [db.Sequelize.Op.or]: {
          caption: { [db.Sequelize.Op.like]: `%${req.query.search}%` },
          "$users.username$": {
            [db.Sequelize.Op.like]: `%${req.query.search}%`,
          },
        },
      },
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
}

module.exports = Post;
