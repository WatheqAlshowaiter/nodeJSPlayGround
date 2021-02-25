const p1 = new Promise((resove, reject) => {
	setTimeout(() => {
		console.log("Async operation 1");
		resove(1);
	}, 2000);
});

const p2 = new Promise((resove, reject) => {
	setTimeout(() => {
		console.log("Async operation 2");
		// resove(2);
		reject(new Error("something failed"));
	}, 2000);
});

Promise.race([p1, p2])
	.then((result) => console.log(result))
	.catch((err) => console.log("Error", err.message));
