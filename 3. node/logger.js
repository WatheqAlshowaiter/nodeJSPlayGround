
const EventEmitter = require("events");

var url = "https://logger.io/api/";

class Logger extends EventEmitter {
	
	log(message) {
		// call http request
		console.log(message);
		
		// raise an event
		this.emit("messageLogged", { id: 1, url: "http://somewebsite.com" });
	}
}

module.exports = Logger;
