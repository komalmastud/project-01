const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//Middleware - Plugins
app.use(express.urlencoded({ extended: false }));
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
  .route("api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //edit user with id
    return res.joson({ status: "Pending" });
  })
  .delete((req, res) => {
    //delete user with id
    return res.joson({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "sucess!", id: users.length });
  });
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
