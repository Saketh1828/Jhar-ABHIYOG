import express from 'express';
import { createOffer } from '../controllers/collaborationController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/membership-offers', authenticate, createOffer);

export default router;
