const express = require('express');
const { createProject, getProjects, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const roles = require('../utils/roles');

const router = express.Router();

router.post('/createProject', authorize([roles.UserAdmin, roles.SubAdmin]), createProject);
router.get('/createProject', getProjects);
router.put('/updateProject/:id', authorize([roles.UserAdmin, roles.SubAdmin]), updateProject);
router.delete('/updateProject/:id', authorize([roles.UserAdmin]), deleteProject);

module.exports = router;
