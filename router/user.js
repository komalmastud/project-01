// router/user.js
const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

// Defining the routes for users
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router
  .route("/:id")
  .get(handleGetUserById)
  .put(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
