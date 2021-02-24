const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connect to db"))
	.catch((err) => console.log("Can not connect db..", err));

const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "CS50",
		author: "Harvard",
		tags: ["C", "DS", "Pyhon", "SQL"],
		isPublished: true,
	});
	const result = await course.save();
	console.log(result);
}

// createCourse();

async function getCourses() {
	// const pageNumber = 2;
	const pageSize = 10;

	const courses = await Course
		// .find({ author: "Mustafa Saad" })
		// .find({ author: { $in: ["Mustafa Saad", "Harvard"] } })
		.find({ author: /.*Saad*./i })
		// .or([{  author: "Mosh Hamedani" }, { name: "CS50" }])
		// .skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		// .count();
		.select({ name: 1, author: 1 });

	console.log(courses);
}

// getCourses();

async function updateCourse(id) {
	const result = await Course.findByIdAndUpdate(
		id,
		{
			$set: {
				author: "Samuel Jackson",
			},
		},
		{ new: true }
	);

	console.log(result);
}

async function removeCourse(id) {
	// const result = await Course.deleteOne(id)
	const course = await Course.findByIdAndRemove(id);
	console.log(course);
}

// removeCourse("603646498cbf2a0f3b909ef9");
