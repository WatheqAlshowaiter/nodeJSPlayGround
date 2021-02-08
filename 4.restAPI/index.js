const startupDebug = require("debug")("app:startup");
const dbDebug = require("debug")("app:db");

const config = require("config");
const helmet = require("helmet");
var morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const log = require("./middleware/logger");
const course = require("./routes/courses");
const home = require("./routes/home");
const func = require("joi/lib/types/func");
const app = express();
app.set("view engine", "pug");
app.set("views", "./views/");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", course);
app.use("/", home);

if (app.get("env") === "development") {
	app.use(morgan("tiny"));
	startupDebug("Morgan starting.. ");
}

// db work
dbDebug("db works.. ");

// Configurations
console.log("Application Name: " + config.get("name"));
console.log("Application Server: " + config.get("mail.host"));
if (config.get("mail.password"))
	console.log("Application Password: " + config.get("mail.password"));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`); // development is the default

app.use(log);
app.use(function (req, res, next) {
	console.log("Authenticating.. ");
	next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
