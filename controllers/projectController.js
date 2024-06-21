const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const { name, description, teamMembers } = req.body;
  try {
    const newProject = new Project({
      name,
      description,
      teamMembers,
      createdBy: req.user.id
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProject = async (req, res) => {
  const { name, description, teamMembers } = req.body;
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.teamMembers = teamMembers || project.teamMembers;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
