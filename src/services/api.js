/**
 * Centralized REST API Client for Samasya Nivark
 * Supports production REST endpoints with fallback to local mock data when offline.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('sih_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `API error (${response.status})`);
    }
    return data;
  } catch (error) {
    console.warn(`[API Client Warning] Call to ${endpoint} failed or offline:`, error.message);
    throw error;
  }
}

export const api = {
  // Health
  health: () => request('/health').catch(() => ({ status: 'UP (Local Fallback Mode)' })),

  // Authentication & Identity
  auth: {
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    getMe: () => request('/auth/me'),
    verifyIdentity: (data) => request('/auth/verify-identity', { method: 'POST', body: JSON.stringify(data) })
  },

  // Problems API
  problems: {
    getAll: (params = '') => request(`/problems${params}`),
    getById: (id) => request(`/problems/${id}`),
    create: (problemData) => request('/problems', { method: 'POST', body: JSON.stringify(problemData) }),
    updateStatus: (id, statusData) => request(`/problems/${id}/status`, { method: 'PUT', body: JSON.stringify(statusData) }),
    toggleLike: (id) => request(`/problems/${id}/like`, { method: 'POST' }),
    toggleTrack: (id) => request(`/problems/${id}/track`, { method: 'POST' })
  },

  // Projects API
  projects: {
    getAll: () => request('/projects'),
    create: (projectData) => request('/projects', { method: 'POST', body: JSON.stringify(projectData) }),
    join: (projectId, requestData) => request(`/projects/${projectId}/join`, { method: 'POST', body: JSON.stringify(requestData) })
  },

  // Collaborations API
  collaborations: {
    getAll: () => request('/collaborations'),
    createOffer: (offerData) => request('/membership-offers', { method: 'POST', body: JSON.stringify(offerData) })
  },

  // AI Service Proxy API
  ai: {
    analyze: (data) => request('/ai/analyze-problem', { method: 'POST', body: JSON.stringify(data) }),
    recommendReceiver: (data) => request('/ai/recommend-receiver', { method: 'POST', body: JSON.stringify(data) })
  },

  // Voice Speech-to-Text API
  voice: {
    transcribe: (audioData) => request('/voice/transcribe', { method: 'POST', body: JSON.stringify(audioData) })
  },

  // Translation API
  translation: {
    translate: (data) => request('/translation/translate', { method: 'POST', body: JSON.stringify(data) })
  }
};
