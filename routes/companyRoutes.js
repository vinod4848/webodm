const express = require("express");
const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const authorize = require("../middleware/role");
const roles = require("../utils/roles");
const { authMiddleware, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware,isAdmin,authorize, createCompany);
router.get("/", getCompanies);
router.put("/:id", authorize([roles.UserAdmin]), updateCompany);
router.delete("/:id", authorize([roles.UserAdmin]), deleteCompany);

module.exports = router;
