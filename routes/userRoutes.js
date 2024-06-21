const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/role");
const roles = require("../utils/roles");

const router = express.Router();

// router.get("/getUser", auth, getUser);
// router.put("/updateUser", auth, updateUser);
// router.delete("deleteUser/:id", auth, authorize([roles.UserAdmin]), deleteUser);

module.exports = router;
