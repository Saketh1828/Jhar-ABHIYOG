import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PROBLEMS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_USERS, 
  INITIAL_UNIVERSITIES, 
  INITIAL_INDUSTRIES, 
  INITIAL_PROJECTS, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';
import { recommendReceiver } from '../utils/aiReceiverEngine';

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

export const validateMobileNumber = (mobile) => {
  const cleaned = String(mobile).replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validateDescriptionText = (desc) => {
  if (!desc || typeof desc !== 'string') return false;
  const trimmed = desc.trim();
  return trimmed.length >= 15;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sih_user');
    return saved ? JSON.parse(saved) : {
      name: "",
      mobile: "",
      email: "",
      role: "citizen",
      isLoggedIn: false
    };
  });

  const [problems, setProblems] = useState(() => {
    const saved = localStorage.getItem('sih_problems');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sih_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [likedProblemIds, setLikedProblemIds] = useState(() => {
    const saved = localStorage.getItem('sih_liked_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [trackedProblemIds, setTrackedProblemIds] = useState(() => {
    const saved = localStorage.getItem('sih_tracked_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [sentEmails, setSentEmails] = useState(() => {
    const saved = localStorage.getItem('sih_sent_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('sih_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [universities, setUniversities] = useState(() => {
    const saved = localStorage.getItem('sih_universities');
    return saved ? JSON.parse(saved) : [];
  });

  const [industries, setIndustries] = useState(() => {
    const saved = localStorage.getItem('sih_industries');
    return saved ? JSON.parse(saved) : [];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('sih_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('sih_audit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [isDbConnected, setIsDbConnected] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState(null);
  const [resolvedAnimationProblem, setResolvedAnimationProblem] = useState(null);
  const [isDemoEmailModalOpen, setIsDemoEmailModalOpen] = useState(false);

  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    return localStorage.getItem('sih_language') || 'en';
  });

  const setLanguage = (langCode) => {
    setCurrentLanguageState(langCode);
    localStorage.setItem('sih_language', langCode);
  };

  // Sync with MongoDB backend API on mount
  useEffect(() => {
    const syncBackendData = async () => {
      try {
        const health = await api.health();
        if (health && health.status && health.status.includes('UP')) {
          setIsDbConnected(true);
        }
        const probRes = await api.problems.getAll();
        if (probRes && probRes.data && Array.isArray(probRes.data) && probRes.data.length > 0) {
          setProblems(probRes.data);
        }
        const projRes = await api.projects.getAll();
        if (projRes && projRes.data && Array.isArray(projRes.data) && projRes.data.length > 0) {
          setProjects(projRes.data);
        }
      } catch (err) {
        console.warn("Backend API sync offline. Operating in local mode.");
      }
    };
    syncBackendData();
  }, []);

  useEffect(() => {
    localStorage.setItem('sih_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sih_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('sih_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sih_liked_ids', JSON.stringify(likedProblemIds));
  }, [likedProblemIds]);

  useEffect(() => {
    localStorage.setItem('sih_tracked_ids', JSON.stringify(trackedProblemIds));
  }, [trackedProblemIds]);

  useEffect(() => {
    localStorage.setItem('sih_sent_emails', JSON.stringify(sentEmails));
  }, [sentEmails]);

  useEffect(() => {
    localStorage.setItem('sih_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sih_universities', JSON.stringify(universities));
  }, [universities]);

  useEffect(() => {
    localStorage.setItem('sih_industries', JSON.stringify(industries));
  }, [industries]);

  useEffect(() => {
    localStorage.setItem('sih_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('sih_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const loginUser = (userData) => {
    const updated = {
      name: userData.name || "Birsa Soren",
      mobile: userData.mobile || "+91 98765 43210",
      email: userData.email || `${(userData.name || "user").toLowerCase().replace(/\s+/g, '.')}@samasya.example`,
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
      email: "",
      role: "citizen",
      isLoggedIn: false
    });
  };

  const switchRole = (newRole) => {
    setCurrentUser(prev => ({ ...prev, role: newRole }));
  };

  // Like / Support Toggle (Section 23)
  const toggleLike = (id) => {
    const isAlreadyLiked = likedProblemIds.includes(id);

    if (isAlreadyLiked) {
      setLikedProblemIds(prev => prev.filter(item => item !== id));
      setProblems(prev => prev.map(p => p.id === id ? { ...p, supportersCount: Math.max(0, p.supportersCount - 1) } : p));
    } else {
      setLikedProblemIds(prev => [...prev, id]);
      setProblems(prev => prev.map(p => p.id === id ? { ...p, supportersCount: p.supportersCount + 1 } : p));
    }
  };

  // Track Problem Toggle (Section 24 & 25)
  const toggleTrack = (id) => {
    const isAlreadyTracked = trackedProblemIds.includes(id);

    if (isAlreadyTracked) {
      setTrackedProblemIds(prev => prev.filter(item => item !== id));
    } else {
      setTrackedProblemIds(prev => [...prev, id]);
      
      const prob = problems.find(p => p.id === id);
      const newNotif = {
        id: Date.now(),
        title: "Started Tracking Problem",
        message: `You are now monitoring progress updates for problem #${id} (${prob?.title || 'Challenge'}).`,
        time: "Just now",
        unread: true,
        type: "status",
        link: `/tracked-problems`
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
  };

  // Add Problem (Section 21 & 22: AI Receiver Recommendation Engine integrated)
  const addProblem = (formData) => {
    const { priorityScore, priority, targetResponse } = calculatePriority(
      formData.affectedPeople,
      formData.severity,
      formData.category
    );

    const newId = `JH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiverData = recommendReceiver(formData.category, formData.description, formData.district || "Dumka");

    const newProblem = {
      id: newId,
      title: formData.title,
      category: formData.category,
      subcategory: formData.category,
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
      reporterEmail: currentUser.email || "citizen.demo@samasya.example",
      dateReported: new Date().toISOString().split('T')[0],
      supportersCount: 1,
      
      // AI Receiver recommendation fields (Section 21 & 22)
      recommendedReceiver: receiverData.recommendedReceiver,
      receiverType: receiverData.receiverType,
      whyReceiver: receiverData.whyReceiver,
      assignedDepartment: receiverData.recommendedReceiver,
      assignedUniversity: receiverData.assignedUniversity,
      assignedTeam: null,
      industryPartner: receiverData.industryPartner,

      photos: formData.photos && formData.photos.length > 0 ? formData.photos : [
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&q=80"
      ],
      solutionProposed: null,
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          step: "Submitted",
          note: `Report submitted by ${currentUser.name || 'Citizen'}. AI Recommended Receiver: ${receiverData.recommendedReceiver}`
        }
      ]
    };

    setProblems(prev => [newProblem, ...prev]);
    setLastSubmittedId(newId);

    // Auto-track reporter's own report
    setTrackedProblemIds(prev => [...prev, newId]);

    // System notification
    const newNotif = {
      id: Date.now(),
      title: "Problem Report Registered & Routed",
      message: `Your report '${newProblem.title}' was assigned AI Recommended Receiver: ${receiverData.recommendedReceiver}. Priority: ${priority}.`,
      time: "Just now",
      unread: true,
      type: "status",
      link: `/problem/${newId}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newProblem;
  };

  // Status update (Section 18: Triggers Resolved Animation Popup)
  const updateProblemStatus = (id, newStatus, note = "", assignedTeam = null, solutionText = null) => {
    let resolvedItem = null;

    setProblems(prev => prev.map(prob => {
      if (prob.id === id) {
        const resolutionDate = newStatus === 'Resolved' ? new Date().toISOString().split('T')[0] : prob.resolutionDate;
        const updatedHistory = [...prob.history, {
          date: new Date().toISOString().split('T')[0],
          step: newStatus,
          note: note || `Status updated to ${newStatus}`
        }];

        const updated = {
          ...prob,
          status: newStatus,
          history: updatedHistory,
          resolutionDate,
          ...(assignedTeam ? { assignedTeam } : {}),
          ...(solutionText ? { solutionProposed: solutionText, resolutionDescription: solutionText } : {})
        };

        if (newStatus === 'Resolved') {
          resolvedItem = updated;
        }

        return updated;
      }
      return prob;
    }));

    if (resolvedItem) {
      setResolvedAnimationProblem(resolvedItem);
    }

    // System Notification
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

  const proposeSolution = (id, solutionData) => {
    updateProblemStatus(
      id,
      "Solution Proposed",
      `Solution proposed by ${solutionData.teamName} (${solutionData.institution})`,
      `${solutionData.teamName} (${solutionData.institution})`,
      solutionData.description
    );
  };

  // Send Email Abstraction Dispatcher (Section 27 & 29)
  const sendEmail = (emailObj) => {
    setSentEmails(prev => [emailObj, ...prev]);

    const notif = {
      id: Date.now(),
      title: `Email Sent: ${emailObj.subject}`,
      message: `Simulated dispatches sent to ${emailObj.to}.`,
      time: "Just now",
      unread: true,
      type: "collaboration",
      link: "#"
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // RBAC Helper Actions
  const changeUserRole = (userId, newRole) => {
    let targetName = userId;
    let oldRole = 'User';
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        targetName = u.name;
        oldRole = u.role;
        return { ...u, role: newRole };
      }
      return u;
    }));

    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: currentUser.name || "Platform Super Admin",
      actorRole: currentUser.role || "SUPER_ADMIN",
      action: "ROLE_CHANGE",
      target: targetName,
      details: `Reassigned role from ${oldRole} to ${newRole}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deactivateUser = (userId) => {
    let targetName = userId;
    let newStatus = 'Inactive';
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        targetName = u.name;
        newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    }));

    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: currentUser.name || "Platform Super Admin",
      actorRole: currentUser.role || "SUPER_ADMIN",
      action: "USER_STATUS_CHANGE",
      target: targetName,
      details: `Toggled user account status to ${newStatus}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addUniversity = (univData) => {
    const newId = `UNIV-${String(universities.length + 1).padStart(3, '0')}`;
    const newUniv = {
      id: newId,
      name: univData.name,
      district: univData.district || "Ranchi",
      address: univData.address || `${univData.name} Campus`,
      adminEmail: univData.email || "admin@univ.example",
      assignedProjects: 0,
      verifiedStudents: 0,
      activeFaculty: 0,
      status: "Active"
    };
    setUniversities(prev => [...prev, newUniv]);

    const newUnivUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: `${univData.name} Admin`,
      email: univData.email || `admin.${newId.toLowerCase()}@samasya.example`,
      mobile: "+91 98000 00000",
      role: "UNIVERSITY_ADMIN",
      organization: univData.name,
      organizationId: newId,
      organizationType: "UNIVERSITY",
      district: univData.district || "Ranchi",
      status: "Active",
      createdDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUnivUser]);

    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: currentUser.name || "Platform Super Admin",
      actorRole: currentUser.role || "SUPER_ADMIN",
      action: "CREATE_UNIVERSITY",
      target: univData.name,
      details: `Registered new University entity & initialized University Admin account`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addIndustry = (indData) => {
    const newId = `IND-${String(industries.length + 1).padStart(3, '0')}`;
    const newInd = {
      id: newId,
      name: indData.name,
      district: indData.district || "East Singhbhum",
      type: indData.type || "CSR Corporate Partner",
      csrBudget: "₹ 50 Lakhs",
      sponsoredProjects: 0,
      adminEmail: indData.email || "csr@industry.example",
      status: "Active"
    };
    setIndustries(prev => [...prev, newInd]);

    const newIndUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: `${indData.name} CSR Admin`,
      email: indData.email || `csr.${newId.toLowerCase()}@samasya.example`,
      mobile: "+91 94000 00000",
      role: "INDUSTRY_ADMIN",
      organization: indData.name,
      organizationId: newId,
      organizationType: "INDUSTRY",
      district: indData.district || "East Singhbhum",
      status: "Active",
      createdDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newIndUser]);

    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: currentUser.name || "Platform Super Admin",
      actorRole: currentUser.role || "SUPER_ADMIN",
      action: "CREATE_INDUSTRY",
      target: indData.name,
      details: `Registered new Industry entity & initialized Industry Admin account`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addProject = (projData) => {
    const newId = `PROJ-${Math.floor(100 + Math.random() * 900)}`;
    const newProject = {
      id: newId,
      title: projData.title,
      problemId: projData.problemId,
      university: projData.university || currentUser.university || "BIT Mesra",
      leadStudent: projData.leadStudent,
      facultyMentor: projData.facultyMentor,
      industrySponsor: projData.industrySponsor || "Tata Steel CSR",
      status: "Under Development",
      completion: 15,
      description: projData.description
    };
    setProjects(prev => [...prev, newProject]);

    updateProblemStatus(projData.problemId, "In Progress", `Project #${newId} (${projData.title}) assigned under ${newProject.university}`);

    const newLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actorName: currentUser.name || "University Admin",
      actorRole: currentUser.role || "UNIVERSITY_ADMIN",
      action: "CREATE_PROJECT",
      target: projData.title,
      details: `Launched academic problem-solving project for problem #${projData.problemId}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
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
      likedProblemIds,
      toggleLike,
      trackedProblemIds,
      toggleTrack,
      proposeSolution,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      lastSubmittedId,
      resolvedAnimationProblem,
      setResolvedAnimationProblem,
      sentEmails,
      sendEmail,
      isDemoEmailModalOpen,
      setIsDemoEmailModalOpen,
      users,
      universities,
      industries,
      projects,
      auditLogs,
      changeUserRole,
      deactivateUser,
      addUniversity,
      addIndustry,
      addProject,
      currentLanguage,
      setLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
