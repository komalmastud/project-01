// controllers/user.js
const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  try {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve users", message: err.message });
  }
}

async function handleGetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to retrieve user", message: err.message });
  }
}

async function handleUpdateUserById(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { lastName: "Changes" },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ status: "Success", user });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update user", message: err.message });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ status: "Success" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete user", message: err.message });
  }
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    return res.status(201).json({ msg: "Success", id: result._id });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create user", message: err.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
