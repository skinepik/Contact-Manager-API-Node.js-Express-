const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  const logPath = path.join(__dirname, "..", "log.txt");

  fs.appendFile(logPath, logData, (err) => {
    if (err) console.error("Gagal mencatat log:", err);
  });

  next();
};

module.exports = logger;
