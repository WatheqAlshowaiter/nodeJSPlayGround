const Joi = require("joi");
const express = require("express");
const func = require("joi/lib/types/func");
const app = express();

app.use(express.json());

const courses = [
	{ id: 1, name: "course1" },
	{ id: 2, name: "course2" },
	{ id: 3, name: "course3" },
];

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
	res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);
	if (!course) return res.status(404).send("not found. 404 error!");

	res.send(course);
});

app.post("/api/courses", (req, res) => {
	const { error } = validateCourse(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};

	courses.push(course);
	res.send(course);
});

app.put("/api/course/:id", (req, res) => {
	// get the course
	// if not send an error
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);
	if (!course) return res.status(404).send("not found. 404 error!");

	// validate inputs
	const { error } = validateCourse(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	course.name = req.body.name;
	res.send(course);
});

app.delete("/api/course/:id", (req, res) => {
	const course = courses.find(
		(course) => course.id === parseInt(req.params.id)
	);
	if (!course) return res.status(404).send("not found. 404 error!");

	const index = courses.indexOf(course);
	courses.splice(index, 1);
	return course;
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
	};
	return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
