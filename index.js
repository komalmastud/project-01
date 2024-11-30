const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8001;

// Middleware - Plugins
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "komal Mastud");
  return res.json(users);
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
  const { first_name, last_name, email, gender, job_title } = req.body;

  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    gender,
    job_title,
  };
  users.push(newUser);

  try {
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
    return res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
