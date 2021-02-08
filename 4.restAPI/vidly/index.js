const Joi = require("joi");
const express = require("express");
const genres = require("./routes/genres");
const app = express();
app.use(express.json());
app.use('/api/genres', genres);

app.get("/", (req, res) => {
	res.send("Hello to Vidly website");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
