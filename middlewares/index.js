const express = require("express");
const fs = require("fs");
const app = express();

// Ensure express.json() is used to handle POST body
app.use(express.json());

// Middleware to log request and response
function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`,
      (err) => {
        if (err) {
          console.error("Error writing to log file:", err);
        }
        next(); // Proceed to the next middleware or route handler
      }
    );
  };
}

// Apply logReqRes middleware globally
app.use(logReqRes("logfile.txt"));

// POST route example
app.post("/your-post-route", (req, res) => {
  console.log("Received POST body:", req.body); // Log the POST body
  res.send("POST request received");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
