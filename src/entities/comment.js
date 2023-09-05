const db = require("../models");
const Entity = require("./entity");

class Comment extends Entity {
  constructor(model) {
    super(model);
  }

  async getAllComment(req, res) {
    const postId = req.params.post_id;
    await db.Post.findAll({
      where: { id: postId },
      include: [
        {
          model: db.Comment,
          as: "comments",

          include: [
            {
              model: db.User, // Tambahkan model User
              as: "users", // Ganti dengan nama hubungan antara Comment dan User jika berbeda
            },
          ],
        },
      ],

      order: [["createdAt", "DESC"]],
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
}

module.exports = Comment;
