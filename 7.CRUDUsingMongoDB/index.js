const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connect to db"))
	.catch((err) => console.log("Can not connect db..", err));

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 255,
		// match: /pattern/,
	},
	category: {
		type: String,
		required: true,
		enum: ["mobile", "web", "desktop"],
		lowercase: true,
		trim: true,
	},
	author: String,
	tags: {
		type: Array,
		validate: {
			isAsync: true,
			validator: function (v, callback) {
				setTimeout(() => {
					const result = v && v.length > 0;
					callback(result);
				}, 4000);
			},
			message: "A course should have at least one tag",
		},
	},
	date: { type: Date, default: Date.now },
	isPublished: { type: Boolean, required: true },
	price: {
		type: Number,
		required: function () {
			return this.isPublished;
		},
		min: 10,
		max: 200,
		get: (v) => Math.round(v),
		set: (v) => Math.round(v),
	},
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "Intro to Laravel",
		category: "Web",
		author: "Hamed",
		tags: ["backend"],
		isPublished: true,
		price: 20.5,
		
	});
	try {
		// await course.validate((err) => (err ? console.log(err) : ""));
		const result = await course.save();
		console.log(result);
	} catch (ex) {
		// console.log(ex.message);
		for (field in ex.errors) {
			console.log(ex.errors[field].message);
		}
	}
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

createCourse();
