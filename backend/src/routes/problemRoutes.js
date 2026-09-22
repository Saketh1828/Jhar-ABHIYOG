import express from 'express';
import { getProblems, getProblemById, createProblem, updateStatus, toggleLike } from '../controllers/problemController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', authenticate, createProblem);
router.put('/:id/status', authenticate, updateStatus);
router.post('/:id/like', authenticate, toggleLike);

export default router;
