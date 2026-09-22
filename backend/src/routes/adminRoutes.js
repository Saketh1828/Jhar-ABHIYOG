import express from 'express';
import { getUsers, changeRole, getAuditLogs } from '../controllers/adminController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole('SUPER_ADMIN'));

router.get('/users', getUsers);
router.post('/change-role', changeRole);
router.get('/audit-logs', getAuditLogs);

export default router;
