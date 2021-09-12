let router = require("express").Router();
const User = require("../db").import("../models/user");
const Post = require("../db").import("../models/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/*GET USERS ENDPOINT */
router.get("/", function (req, res) {
  Post.findAll()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

/* REGISTER END POINT --->Allows a new user to be created with a username and password.
 */
router.post("/create", function (req, res) {
  User.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        user: user,
        message: "User succesfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/* LOGIN END POINT --->Allows a new user to be created with a username and password.
 */

router.post("/login", function (req, res) {
  console.log(process.env.JWT_SECRET);
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 * 24 }
        );

        res.status(200).json({
          user: user,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      } else {
        res.status(500).json({ error: "user does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
