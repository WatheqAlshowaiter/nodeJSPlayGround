// get all published backend courses
// sort thier names
// pick only name and author
// then deisplay

const mongoose = require("mongoose");

// connect
mongoose
	.connect("mongodb://localhost/mongo-exercises")
	.then(() => console.log("connect to `mongo-exercises` DB successfully"))
	.catch((err) => console.log("An error happened in the connection: ", err));
// schema
const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	price: Number,
	isPublished: Boolean,
});
// model
const Course = mongoose.model("Course", courseSchema);

// query
async function getCourses() {
	return await Course
		//
		.find({ isPublished: true })
		.or([{ name: /.*by*./i }, { price: { $gte: 10 } }])
		.sort({ price: -1 })
		.select({ name: 1, author: 1, price: 1 });
}

async function run() {
	const courses = await getCourses();
	console.log(courses);
}

run();
