import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Layout/Navigation';
import { ProtectedRoute } from './components/Common/ProtectedRoute';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { Companies } from './pages/Companies';
import { Directory } from './pages/Directory';
import { Posts } from './pages/Posts';
import { Profile } from './pages/Profile';
import { WorkRequests } from './pages/WorkRequests';
import { Chat } from './pages/Chat';
import { Analytics } from './pages/Analytics';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navigation />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Navigation />
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/directory"
          element={
            <ProtectedRoute>
              <Navigation />
              <Directory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Navigation />
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId?"
          element={
            <ProtectedRoute>
              <Navigation />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Navigation />
              <WorkRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:userId?"
          element={
            <ProtectedRoute>
              <Navigation />
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Navigation />
              <Analytics />
            </ProtectedRoute>
          }
        />
        {/* Legacy redirects */}
        <Route
          path="/talent-directory"
          element={<Navigate to="/directory" replace />}
        />
        <Route
          path="/users"
          element={<Navigate to="/directory" replace />}
        />
        <Route
          path="/requests"
          element={<Navigate to="/projects" replace />}
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;