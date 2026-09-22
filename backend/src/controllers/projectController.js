import { Project } from '../models/Project.js';
import { JoinRequest } from '../models/JoinRequest.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    const newId = `PROJ-${Math.floor(100 + Math.random() * 900)}`;

    const project = await Project.create({
      ...projectData,
      id: newId
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const joinProject = async (req, res, next) => {
  try {
    const { applicantName, applicantEmail, applicantRole, message } = req.body;
    const newId = `JOIN-${Math.floor(1000 + Math.random() * 9000)}`;

    const joinRequest = await JoinRequest.create({
      id: newId,
      projectId: req.params.id,
      applicantName,
      applicantEmail,
      applicantRole: applicantRole || 'Student / Researcher',
      message: message || 'Interested in contributing engineering expertise.'
    });

    res.status(201).json({ success: true, data: joinRequest, message: 'Join request submitted successfully' });
  } catch (error) {
    next(error);
  }
};
