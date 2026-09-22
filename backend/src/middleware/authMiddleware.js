import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If no token provided, set a default fallback user for demo convenience
    req.user = {
      id: "USR-001",
      name: "Platform Creator (Super Admin)",
      email: "creator.admin@samasya.example",
      role: "SUPER_ADMIN",
      organizationId: "ORG-000",
      organizationType: "PLATFORM"
    };
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'samasya_nivark_super_secure_jwt_secret_sih2026_jharkhand');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token' });
  }
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (req.user.role === 'SUPER_ADMIN' || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: '403 Access Denied: You do not have permission to access this resource',
      requiredRoles: allowedRoles,
      yourRole: req.user.role
    });
  };
};

export const requireOrganizationAccess = (targetOrgId) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Authentication required' });
    if (req.user.role === 'SUPER_ADMIN') return next();

    if (req.user.organizationId === targetOrgId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `403 Access Denied: Restricted to members of organization ${targetOrgId}`
    });
  };
};
