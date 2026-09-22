import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AccessDenied } from '../../pages/AccessDenied';

export const ProtectedRoute = ({ children, allowedRoles = [], targetOrgId = null }) => {
  const { currentUser } = useApp();

  if (!currentUser.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Normalize current role string
  const roleUpper = (currentUser.role || 'CITIZEN').toUpperCase().replace(/\s+/g, '_');
  
  // Super Admin can access EVERYTHING
  if (roleUpper === 'SUPER_ADMIN' || roleUpper === 'PLATFORM_SUPER_ADMIN') {
    return children;
  }

  // Match allowed roles
  const normalizedAllowed = allowedRoles.map(r => r.toUpperCase().replace(/\s+/g, '_'));

  // Handle equivalence between role naming variations
  const isMatch = normalizedAllowed.some(reqRole => {
    if (reqRole === roleUpper) return true;
    if (reqRole === 'UNIVERSITY_ADMIN' && (roleUpper === 'UNIVERSITY' || roleUpper === 'UNIVERSITY_ADMIN')) return true;
    if (reqRole === 'INDUSTRY_ADMIN' && (roleUpper === 'INDUSTRY' || roleUpper === 'INDUSTRY_ADMIN')) return true;
    if (reqRole === 'GOVERNMENT_ADMIN' && (roleUpper === 'GOVERNMENT' || roleUpper === 'GOVERNMENT_ADMIN')) return true;
    return false;
  });

  if (!isMatch) {
    return <AccessDenied requiredRole={allowedRoles[0]} currentRole={currentUser.role} />;
  }

  // Check Organization ownership (Section 22 & 23)
  if (targetOrgId && currentUser.organizationId && currentUser.organizationId !== targetOrgId) {
    return <AccessDenied requiredRole={`Organization ${targetOrgId}`} currentRole={`Organization ${currentUser.organizationId}`} />;
  }

  return children;
};
