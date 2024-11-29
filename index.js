const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

// Middleware - Plugins
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.method}: ${req.ip}\n`,
    (err) => {
      if (err) console.error("Failed to log request");
      next();
    }
  );
});

app.use((req, res, next) => {
  req.body = {}; // Initialize req.body
  console.log("Hello from middleware 1");
  next();
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
  return res.json(users); // Returns all users as JSON
});

app
  .route("/api/users/:id") // Add leading slash
  .get((req, res) => {
    const id = Number(req.params.id);
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
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", message: "File write failed" });
    }
    return res.json({ status: "success!", id: users.length });
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
