let router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");

/* REGISTER END POINT --->Allows a new user to be created with a username and password.
 */
router.post("/create", function (req, res) {
	User.create({
		email: req.body.user.email,
		password: req.body.user.password,
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
