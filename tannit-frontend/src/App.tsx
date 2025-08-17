import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Callback from './pages/Callback';
import Dashboard from './pages/Dashboard';
import SignupWithEmail from './pages/SignupWithEmail';
import VerifyEmailPage from './pages/VerifyEmailPage';

import { useSelector } from 'react-redux';
import { RootState } from './store';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfileCreatedPage from './pages/ProfileCreatedPage';
import ProfileCreatedClaimedPage from './pages/ProfileCreatedClaimedPage';
import OnboardingStepsPage from './pages/OnboardingStepsPage';
import UserProfilePage from './pages/UserProfilePage';
import PropertiesPage from './pages/PropertiesPage';
import GoogleCallback from './pages/GoogleCallback';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={4000} />

      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/SignupWithEmail" element={<SignupWithEmail />} />
        <Route path="/VerifyEmailPage" element={<VerifyEmailPage />} />
        <Route path="/ProfileCreatedPage" element={<ProfileCreatedPage />} />
        <Route path="/ProfileCreatedClaimedPage" element={<ProfileCreatedClaimedPage />} />
        <Route path="/OnboardingStepsPage" element={<OnboardingStepsPage />} />
        <Route path="/UserProfilePage" element={<UserProfilePage />} />
        <Route path="/PropertiesPage" element={<PropertiesPage />} />
        <Route path="/GoogleCallback" element={<GoogleCallback />} />

        {/* Redirection par défaut */}
        <Route
          path="*"
          //element={<Navigate to={isAuthenticated ? "/callback" : "/RegisterPage"} replace />}
          element={<Navigate to="/registerPage" replace />} 
        />
      </Routes>
    </div>
    
  );
}

export default App;
