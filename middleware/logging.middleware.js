const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create a write stream for logging to a file (optional)
const logStream = fs.createWriteStream(
  path.join(__dirname, "../access.log"),
  { flags: "a" }
);

// Define a custom log format
const customLogFormat = '[:date[iso]] :method :url :status :response-time ms - :res[content-length]';

// Create a middleware function
const loggerMiddleware = morgan(customLogFormat, {
  stream: logStream, // Optional: Log to a file
});

module.exports = {loggerMiddleware};
