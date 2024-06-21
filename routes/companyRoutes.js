const express = require('express');
const { createCompany, getCompanies, updateCompany, deleteCompany } = require('../controllers/companyController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const roles = require('../utils/roles');

const router = express.Router();

router.post('/', auth, authorize([roles.UserAdmin]), createCompany);
router.get('/', auth, getCompanies);
router.put('/:id', auth, authorize([roles.UserAdmin]), updateCompany);
router.delete('/:id', auth, authorize([roles.UserAdmin]), deleteCompany);

module.exports = router;
