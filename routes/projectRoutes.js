const express = require('express');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const roles = require('../utils/roles');

const router = express.Router();

router.post('/', auth, authorize([roles.UserAdmin, roles.SubAdmin]), createProject);
router.get('/', auth, getProjects);
router.put('/:id', auth, authorize([roles.UserAdmin, roles.SubAdmin]), updateProject);
router.delete('/:id', auth, authorize([roles.UserAdmin]), deleteProject);

module.exports = router;
