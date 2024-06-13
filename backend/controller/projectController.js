const Project = require('../models/project');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.update(req.params.id, req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
