import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DemoEmailModal } from './components/common/DemoEmailModal';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ReportProblem } from './pages/ReportProblem';
import { Confirmation } from './pages/Confirmation';
import { MyReports } from './pages/MyReports';
import { ExploreProblems } from './pages/ExploreProblems';
import { ProblemDetail } from './pages/ProblemDetail';
import { GovernmentDashboard } from './pages/GovernmentDashboard';
import { StudentPortal } from './pages/StudentPortal';
import { IndustryPortal } from './pages/IndustryPortal';
import { Collaborate } from './pages/Collaborate';
import { Profile } from './pages/Profile';
import { Notifications } from './pages/Notifications';
import { Help } from './pages/Help';
import { TrackedProblems } from './pages/TrackedProblems';
import { ResolvedProblems } from './pages/ResolvedProblems';

// RBAC Admin Pages & Security
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { UniversityAdminDashboard } from './pages/UniversityAdminDashboard';
import { IndustryAdminDashboard } from './pages/IndustryAdminDashboard';
import { AccessDenied } from './pages/AccessDenied';

const AppContent = () => {
  const { isDemoEmailModalOpen, setIsDemoEmailModalOpen } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report-problem" element={<ReportProblem />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/tracked-problems" element={<TrackedProblems />} />
          <Route path="/resolved" element={<ResolvedProblems />} />
          <Route path="/explore" element={<ExploreProblems />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/industry" element={<IndustryPortal />} />
          <Route path="/government" element={<GovernmentDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
          
          {/* RBAC Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/university-admin" 
            element={
              <ProtectedRoute allowedRoles={['UNIVERSITY_ADMIN', 'SUPER_ADMIN']}>
                <UniversityAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/industry-admin" 
            element={
              <ProtectedRoute allowedRoles={['INDUSTRY_ADMIN', 'SUPER_ADMIN']}>
                <IndustryAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </main>
      <Footer />

      {/* Top Level Demo Email Viewer Modal */}
      <DemoEmailModal
        isOpen={isDemoEmailModalOpen}
        onClose={() => setIsDemoEmailModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
