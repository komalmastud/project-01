const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

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
  //TODO:Create new user
  return res.json({ status: "pending" });
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
