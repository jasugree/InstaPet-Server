//THIS WILL BE THE POST CONTROLLER
let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Post = require("../db").import("../models/post");

router.get("/practice", validateSession, function (req, res) {
	res.send("hey! This is a practice route!");
});

console.log("postcontroller, line 11");

/*CREATING A POST*/
router.post("/create", validateSession, function (req, res) {
	const postEntry = {
		image: req.body.post.image,
		description: req.body.post.description,
		likes: req.body.post.likes,
		category: req.body.post.category,
		owner: req.user.id,
	};
	Post.create(postEntry)
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

console.log("post controller, line 27");

/*VIEW ALL POSTS*/
router.get("/", function (req, res) {
	Post.findAll()
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

console.log("post controller, line 36");

/*GET ENTRIES BY USER*/
router.get("/mine", validateSession, function (req, res) {
	let userid = req.user.id;
	Post.findAll({
		where: { owner: userid },
	})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

/*GET ENTRY BY CATEGORY*/
router.get("/:category", function (req, res) {
	let category = req.params.category;
	Post.findAll({
		where: { category: category },
	})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE POST*/
router.put("/update/:entryId", validateSession, function (req, res) {
	const updatePostEntry = {
		image: req.body.post.image,
		description: req.body.post.description,
		likes: req.body.post.likes,
		category: req.body.post.category,
	};
	const query = { where: { id: req.params.entryId, owner: req.user.id } };
	Post.update(updatePostEntry, query)
		.then((posts) =>
			res.status(200).json({ message: "The Post has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*LIKE POST -----> COME BACK TO!!*/
router.put("/like/:entryId", validateSession, function (req, res) {
	const updatePostEntry = {
		likes: req.body.post.likes,
	};
	const query = { where: { id: req.params.entryId } };
	Post.update(updatePostEntry, query)
		.then((posts) =>
			res.status(200).json({ message: "The Post has been Liked." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*DELETE A POST*/
router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id, owner: req.user.id } };
	Post.destroy(query)
		.then((posts) =>
			res.status(200).json({ message: "The Post has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
