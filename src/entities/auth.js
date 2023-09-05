const { Op, DATE, where } = require("sequelize");
const db = require("../models");
const Entity = require("./entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const sharp = require("sharp");
const mailer = require("../lib/nodemailer");
const fs = require("fs");
const mustache = require("mustache");

class Auth extends Entity {
  constructor(model) {
    super(model);
  }

  // async login(req, res) {
  //   const { user, password } = req.body;
  //   try {
  //     const result = await db.User.findOne({
  //       where: {
  //         [db.Sequelize.Op.or]: {
  //           email: { [db.Sequelize.Op.like]: `%${user}` },
  //           username: { [db.Sequelize.Op.like]: `%${user}` },
  //           phone_number: { [db.Sequelize.Op.like]: `%${user}` },
  //         },
  //       },
  //     });
  //     if (!result) {
  //       return res.status(404).send("User not found");
  //     }

  //     if (result.isSuspended) {
  //       return res.status(403).send("User is suspended");
  //     }

  //     if (result.loginAttempts >= 3) {
  //       return res.status(403).send("Login attemps exceeded");
  //     }
  //     const isValid = await bcrypt.compare(password, result.password);

  //     if (!isValid) {
  //       await result.update({
  //         loginAttempts: db.Sequelize.literal("loginAttempts + 1"),
  //       });
  //       return res.status(401).send("Wrong password");
  //     }

  //     // Kalau berhasil login
  //     await result.update({
  //       loginAttempts: 0, // untuk reset percobaan login,
  //       lastLoginAt: new DATE(), // memperbarui kapan dia login
  //       isSuspended: true, //tandai pengguna dinonaktifkan setelah login berhasil
  //     });

  //     delete result.dataValues.password;
  //     const payload = {
  //       id: result.dataValues.id,
  //       is_verified: result.dataValues.is_verified,
  //     };

  //     const token = jwt.sign(payload, process.env.jwt_screet, {
  //       expiresIn: "1h",
  //     });
  //     return res.send({ token, user: result });
  //   } catch (err) {
  //     res.status(500).send(err?.message);
  //   }
  // }
  async login(req, res) {
    const { user, password } = req.body;

    db.User.findOne({
      where: {
        [db.Sequelize.Op.or]: {
          email: { [db.Sequelize.Op.like]: `%${user}` },
          username: { [db.Sequelize.Op.like]: `%${user}` },
          phone_number: { [db.Sequelize.Op.like]: `%${user}` },
        },
      },
    })
      .then(async (result) => {
        console.log(moment(result.suspended_date).diff(moment().format()));
        if (
          moment(result.dataValues.suspended_date).diff(moment().format()) > 0
        )
          throw new Error(
            `Your account has been suspended for${
              moment(result.dataValues.suspended_date).diff(moment().format()) /
              1000
            } sec`
          );
            console.log(result.suspended_date)
        const isValid = await bcrypt.compare(password, result.password);

        if (!isValid) {
          if (result.dataValues.login_attempt >= 2)
            db.User.update(
              {
                login_attempt: 0,
                suspended_date: moment()
                  .add(moment.duration(30, "second"))
                  .format(),
              },
              {
                where: {
                  id: result.dataValues.id,
                },
              }
            );
          else
            db.User.update(
              {
                login_attempt: result.dataValues.login_attempt + 1,
              },
              {
                where: { id: result.dataValues.id },
              }
            );
          throw new Error("Wrong password");
        }
        delete result.dataValues.password;
        const payload = {
          id: result.id,
          is_verified: result.dataValues.is_verified,
        };
        const token = jwt.sign(payload, process.env.jwt_screet, {
          expiresIn: "1h",
        });

        return res.send({ token, user: result });
      })
      .catch((err) => {
        res.status(500).send(err?.message);
      });
  }
  // async register(req, res) {
  //   try {
  //     const isUserExixt = await db.User.findOne({
  //       where: {
  //         [db.Sequelize.Op.or]: {
  //           email: { [db.Sequelize.Op.like]: `%${req.body.email}%` },
  //           username: { [db.Sequelize.Op.like]: `%${req.body.username}%` },
  //           phone_number: {
  //             [db.Sequelize.Op.like]: `%${req.body.phone_number}}%`,
  //           },
  //         },
  //       },
  //     });

  //     if (isUserExixt?.dataValues?.id) {
  //       throw new Error("User is already exists!");
  //     }
  //     req.body.password = await bcrypt.hash(req.body.password, 10);

  //     this.create(req, res);
  //   } catch (err) {
  //     res.status(500).send(err?.message);
  //   }
  // }
  async register(req, res) {
    try {
      const isUserExist = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: {
            email: { [db.Sequelize.Op.like]: `%${req.body.email}` },
            username: { [db.Sequelize.Op.like]: `%${req.body.username}` },
            phone_number: {
              [db.Sequelize.Op.like]: `%${req.body.phone_number}`,
            },
          },
        },
      });

      if (isUserExist?.dataValues?.id) {
        throw new Error("user sudah terdaftar");
      }
      req.body.password = await bcrypt.hash(req.body.password, 10);

      this.create(req, res);
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
  async keepLogin(req, res) {
    try {
      const { token } = req.params;
      console.log(token);
      const data = jwt.verify(token, process.env.jwt_screet);
      if (!data.id) throw new Error("Invalid token");

      console.log(data);

      const payload = await db.User.findOne({
        where: {
          id: data.id,
        },
      });
      delete payload.dataValues.password;

      const newToken = jwt.sign(
        { id: data.id, is_verified: payload.dataValues.is_verified },
        process.env.jwt_screet,
        {
          expiresIn: "1h",
        }
      );

      return res.send({ token: newToken, user: payload });
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
  async editProfile(req, res) {
    try {
      const isUsernameExist = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: {
            username: req.body.username,
          },
        },
      });
      if (req?.file?.filename) req.body.image_url = req.file.name;
      else delete req.body.image_url;

      if (isUsernameExist?.dataValues?.id != req.params.id && isUsernameExist) {
        throw new Error("Username is already use");
      }
      this.updateById(req, res);
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
  async test(req, res) {
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
      req.body.image_blob = await sharp(req.file.buffer).png().toBuffer();
      req.body.image_url = req.file.originalname;
    }
    db.User.update(req.body, {
      where: { id: req.body.id },
    });
    res.send("testing");
  }
  async renderImage(req, res) {
    const { username, image_name } = req.query;
    db.User.findOne({
      where: {
        username,
        image_url: image_name,
      },
    })
      .then((result) => {
        res.set("Content-type", "image/png");
        res.send(result.dataValues.image_blob);
      })
      .catch((err) => res.send(err?.message));
  }
  async resendVerification(req, res) {
    const { id } = req.params;
    const user = await db.User.findOne({
      where: {
        id,
      },
    });
    const template = fs
      .readFileSync(__dirname + "/../template/verify.html")
      .toString();

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        is_verified: user.dataValues.is_verified,
      },
      process.env.jwt_screet,
      {
        expiresIn: "5min",
      }
    );

    const rendered = mustache.render(template, {
      username: user.dataValues.username,
      fullname: user.dataValues.fullname,
      verify_url: process.env.fe_url + token,
    });

    await mailer({
      subject: "User verification",
      html: rendered,
      to: "andreriyantoo19@gmail.com",
      text: "Pinjem dulu surat tanah :)",
    });
    res.send("verification has been sent");
  }
  async verifyUser(req, res) {
    try {
      const { token } = req.query;
      const payload = jwt.verify(token, process.env.jwt_screet);
      if (payload.is_verified) throw new Error("user already verified");
      db.User.update(
        {
          is_verified: true,
        },
        {
          where: {
            id: payload.id,
          },
        }
      );
      res.send("User has been verified");
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
  async resendFogotPassword(req, res) {
    const inputEmail = req.body.email;
    const user = await db.User.findOne({
      where: { email: inputEmail },
    });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .send({ message: "Email is not same as registered" });
    }
    const template = fs
      .readFileSync(__dirname + "/../template/verify.html")
      .toString();

    const rendered = mustache.render(template, {
      email: inputEmail,
      verify_url: process.env.fe_url,
    });

    await mailer({
      subject: "Verification for forgot password",
      html: rendered,
      to: inputEmail,
      textL: "Forgot password",
    });

    res.send({ message: "Verification success send" });
    try {
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
  async forgotPassword(req, res) {
    try {
      const email = req.query.email;
      const passwordInput = req.body.password;
      const chekEmailUser = await db.User.findAll({
        where: { email: email },
      });

      if (chekEmailUser.lengt3h) {
        const hasPassword = await bcrypt.hash(passwordInput, 10);
        await db.User.update(
          { password: hasPassword },
          { where: { email: email } }
        );
      } else {
        res.status(404).send({ message: "Email tidak terdaftar" });
      }

      res.status(200).send({ message: "User di temukan", user: chekEmailUser });
    } catch (err) {
      res.status(500).send(err?.message);
    }
  }
}

module.exports = Auth;
