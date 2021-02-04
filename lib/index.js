// sum
module.exports.sum = (...args) => {
	return args.reduce((a, b) => a + b, 0);
};

// multiplication
module.exports.multiplication = (...args) => {
	return args.reduce((a, b) => a * b, 1);
};