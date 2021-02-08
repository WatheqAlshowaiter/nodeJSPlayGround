const express = require("express");
const router = express.Router();

const genres = [
	{ id: 1, name: "Action" },
	{ id: 2, name: "Sci-Fi" },
	{ id: 3, name: "Thriller" },
	{ id: 4, name: "Horror" },
	{ id: 5, name: "Mystery" },
];

// Get all
router.get("/", (req, res) => {
	res.send(genres);
});

// Get one
router.get("/:id", (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("not found. 404 error!");
	res.send(genre);
});

// Post
router.post("/", (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(404).send("not found. 404 error!");

	const genre = {
		id: genres.length + 1,
		name: req.body.name,
	};

	genres.push(genre);
	res.send(genre);
});
// Put (like update)
router.put("/:id", (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("not found. 404 error!");

	const { error } = validateGenre(req.body);
	if (error) return res.status(404).send("not found. 404 error!");

	genre.name = req.body.name;
	res.send(genre);
});

// Delete
router.delete("/:id", (req, res) => {
	const genre = genres.find((g) => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send("not found. 404 error!");

	const index = genres.indexOf(genre);
	genres.splice(index, 1);
	return genres;
});

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});
	return schema.validate(genre);
}

module.exports = router;
