import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';
import { University } from '../models/University.js';
import { Industry } from '../models/Industry.js';
import { AuditLog } from '../models/AuditLog.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const { userId, newRole } = req.body;
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const oldRole = user.role;
    user.role = newRole;
    await user.save();

    await AuditLog.create({
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: req.user?.name || 'Super Admin',
      actorRole: req.user?.role || 'SUPER_ADMIN',
      action: 'ROLE_CHANGE',
      target: user.name,
      details: `Reassigned role from ${oldRole} to ${newRole}`
    });

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};
