import express from 'express';
import { getProjects, createProject, joinProject } from '../controllers/projectController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', authenticate, createProject);
router.post('/:id/join', authenticate, joinProject);

export default router;
