const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST route to handle user creation
app.post("/api/users", (req, res) => {
  const user = req.body;
  console.log("User received:", user);

  res.status(201).json({ message: "User created successfully", user });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
