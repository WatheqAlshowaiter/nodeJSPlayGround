const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve(1);
		reject(new Error("error message"));
	}, 2000);
});
p.then(() => console.log("promise resolved")).catch((err) =>
	console.log("Error:", err.message)
);
