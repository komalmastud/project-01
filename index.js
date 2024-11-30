const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8001;

// Middleware - Plugins
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded body

// Logging Middleware
app.use((req, res, next) => {
  fs.appendFile("log.txt", `${Date.now()}:${req.method}:${req.ip}\n`, (err) => {
    if (err) console.error("Failed to log request", err);
    next();
  });
});

// Routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html); // Sends an HTML list of user first names
});

// REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "komal Mastud");
  //Always add X to custom Headers
  return res.json(users); // Returns all users as JSON
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const user = users.find((user) => user.id === id);
    return res.json(user || { error: "User not found" });
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  try {
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users));
    return res.json({ status: "success!", id: users.length });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "File write failed" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
