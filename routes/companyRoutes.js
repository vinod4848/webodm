const express = require('express');
const { createCompany, getCompanies, updateCompany, deleteCompany } = require('../controllers/companyController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const roles = require('../utils/roles');

const router = express.Router();

router.post('/createCompany', auth, authorize([roles.UserAdmin]), createCompany);
router.get('/getCompanies', auth, getCompanies);
router.put('/updateCompany/:id', auth, authorize([roles.UserAdmin]), updateCompany);
router.delete('/deleteCompany/:id', auth, authorize([roles.UserAdmin]), deleteCompany);

module.exports = router;
