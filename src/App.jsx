import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

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

function App() {
  return (
    <AppProvider>
      <Router>
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
              <Route path="/explore" element={<ExploreProblems />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />
              <Route path="/collaborate" element={<Collaborate />} />
              <Route path="/student" element={<StudentPortal />} />
              <Route path="/industry" element={<IndustryPortal />} />
              <Route path="/government" element={<GovernmentDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
