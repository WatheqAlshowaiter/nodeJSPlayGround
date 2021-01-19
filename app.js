// console.log("hi, Node");
// console.log(window);
// console.log(module)

// const log = require('./logger');
// const log = require('./logger');

// log('hi hello');

// var path = require('path');
// var pathObj = path.parse(__filename);
// console.log(pathObj.dir);

// var os = require('os');

// var freeMemory = os.freemem();
// var totalMemory = os.totalmem()

// console.log(`free memory: ${freeMemory}`);
// console.log(`free memory: ${totalMemory}`);

// dealing with file system
// const fs = require("fs");
// // const files = fs.readdirSync('./'); // preferred async methods
// // console.log(files);
// fs.readdir("./", (err, data) => {
// 	err ? console.log(err) : console.log(data);
// });

// events
const EventEmitter = require("events");

const Logger = require("./logger")
const logger = new Logger();

logger.on("messageLogged", (arg) => console.log("listener called", arg));
logger.log('my message')
// emitter.on("messageLogged", (arg) => console.log("listener called", arg));

