const jwt = require("jsonwebtoken");

const check_verified = (req, res, next) => {
  try {
    const { token } = req.query;
    const data = jwt.verify(token, process.env.jwt_screet);
    if (!data.is_verified) return res.status(500).send("User belum verified");
    next();
  } catch (err) {
    res.status(500).send(err?.message);
  }
};

module.exports = check_verified;
