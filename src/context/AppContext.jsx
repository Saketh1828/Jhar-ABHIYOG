import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROBLEMS, INITIAL_NOTIFICATIONS } from '../data/mockData';

const AppContext = createContext();

export const calculatePriority = (affectedPeople, severity, category) => {
  let score = 0;
  
  // Population weight
  const people = parseInt(affectedPeople) || 0;
  if (people >= 1000) score += 40;
  else if (people >= 500) score += 30;
  else if (people >= 200) score += 20;
  else score += 10;

  // Severity weight
  const sevMap = { LOW: 10, MEDIUM: 25, HIGH: 40, CRITICAL: 50 };
  score += sevMap[severity] || 15;

  // Category urgency weight
  const urgentCategories = ['Healthcare', 'Health & Emergency', 'Water & Sanitation', 'Road Safety/RTC', 'Public Safety', 'Agriculture'];
  if (urgentCategories.includes(category)) score += 15;

  let priority = 'LOW';
  let targetResponse = 'Target attention: within 14 days';

  if (score >= 90) {
    priority = 'CRITICAL';
    targetResponse = 'Target attention: immediate attention';
  } else if (score >= 65) {
    priority = 'HIGH';
    targetResponse = 'Target attention: within 2 days';
  } else if (score >= 40) {
    priority = 'MEDIUM';
    targetResponse = 'Target attention: within 7 days';
  }

  return { priorityScore: score, priority, targetResponse };
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sih_user');
    return saved ? JSON.parse(saved) : {
      name: "Birsa Soren",
      mobile: "+91 98765 43210",
      role: "citizen",
      district: "Dumka",
      village: "Jama Village",
      isLoggedIn: true
    };
  });

  const [problems, setProblems] = useState(() => {
    const saved = localStorage.getItem('sih_problems');
    return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sih_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [lastSubmittedId, setLastSubmittedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('sih_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sih_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('sih_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const loginUser = (userData) => {
    const updated = {
      name: userData.name || "Birsa Soren",
      mobile: userData.mobile || "+91 98765 43210",
      role: userData.role || "citizen",
      district: userData.district || "Dumka",
      village: userData.village || "Jama",
      university: userData.university || (userData.role === 'student' ? 'BIT Mesra' : ''),
      organization: userData.organization || (userData.role === 'industry' ? 'Tata Steel CSR' : ''),
      isLoggedIn: true
    };
    setCurrentUser(updated);
  };

  const logoutUser = () => {
    setCurrentUser({
      name: "",
      mobile: "",
      role: "citizen",
      isLoggedIn: false
    });
  };

  const switchRole = (newRole) => {
    setCurrentUser(prev => ({ ...prev, role: newRole }));
  };

  const addProblem = (formData) => {
    const { priorityScore, priority, targetResponse } = calculatePriority(
      formData.affectedPeople,
      formData.severity,
      formData.category
    );

    const newId = `JH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProblem = {
      id: newId,
      title: formData.title,
      category: formData.category, // Integrated selected category
      aiSuggestedCategory: formData.aiSuggestedCategory || formData.category,
      aiConfidence: formData.aiConfidence || 92,
      isAiCategoryOverridden: formData.isAiCategoryOverridden || false,
      description: formData.description,
      affectedPeople: parseInt(formData.affectedPeople) || 1,
      village: formData.village || "Local Village",
      district: formData.district || "Dumka",
      state: "Jharkhand",
      severity: formData.severity || "MEDIUM",
      priority: priority,
      priorityScore: priorityScore,
      targetResponse: targetResponse,
      status: "Submitted",
      reportedBy: currentUser.name || "Anonymous Citizen",
      reporterMobile: currentUser.mobile || "+91 98765 43210",
      dateReported: new Date().toISOString().split('T')[0],
      supportersCount: 1,
      photos: formData.photos && formData.photos.length > 0 ? formData.photos : [
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80"
      ],
      assignedTeam: null,
      solutionProposed: null,
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          step: "Submitted",
          note: `Report submitted by ${currentUser.name || 'Citizen'} (AI Category: ${formData.category} - ${formData.aiConfidence || 92}% confidence)`
        }
      ]
    };

    setProblems(prev => [newProblem, ...prev]);
    setLastSubmittedId(newId);

    // Add automatic system notification
    const newNotif = {
      id: Date.now(),
      title: "Problem Report Registered",
      message: `Your report '${newProblem.title}' has been successfully logged with ID ${newId}. AI Category: ${newProblem.category}. Priority: ${priority}.`,
      time: "Just now",
      unread: true,
      type: "status",
      link: `/problem/${newId}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newProblem;
  };

  const updateProblemStatus = (id, newStatus, note = "", assignedTeam = null, solutionText = null) => {
    setProblems(prev => prev.map(prob => {
      if (prob.id === id) {
        const updatedHistory = [...prob.history, {
          date: new Date().toISOString().split('T')[0],
          step: newStatus,
          note: note || `Status changed to ${newStatus}`
        }];
        return {
          ...prob,
          status: newStatus,
          history: updatedHistory,
          ...(assignedTeam ? { assignedTeam } : {}),
          ...(solutionText ? { solutionProposed: solutionText } : {})
        };
      }
      return prob;
    }));

    // Notification
    const newNotif = {
      id: Date.now(),
      title: `Status Update: ${newStatus}`,
      message: `Problem ID ${id} status updated to '${newStatus}'.`,
      time: "Just now",
      unread: true,
      type: "status",
      link: `/problem/${id}`
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateProblemPriority = (id, newPriority) => {
    const slaMap = {
      CRITICAL: 'Target attention: immediate attention',
      HIGH: 'Target attention: within 2 days',
      MEDIUM: 'Target attention: within 7 days',
      LOW: 'Target attention: within 14 days'
    };
    setProblems(prev => prev.map(p => p.id === id ? {
      ...p,
      priority: newPriority,
      severity: newPriority,
      targetResponse: slaMap[newPriority] || p.targetResponse
    } : p));
  };

  const supportProblem = (id) => {
    setProblems(prev => prev.map(p => p.id === id ? { ...p, supportersCount: p.supportersCount + 1 } : p));
  };

  const proposeSolution = (id, solutionData) => {
    updateProblemStatus(
      id,
      "Solution Proposed",
      `Solution proposed by ${solutionData.teamName} (${solutionData.institution})`,
      `${solutionData.teamName} (${solutionData.institution})`,
      solutionData.description
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      loginUser,
      logoutUser,
      switchRole,
      problems,
      addProblem,
      updateProblemStatus,
      updateProblemPriority,
      supportProblem,
      proposeSolution,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      lastSubmittedId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
