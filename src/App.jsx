import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';

// New Pages
import Conversations from './pages/Conversations';
import Analytics from './pages/Analytics';
import DocumentReview from './pages/DocumentReview';
import ScreenAnalysis from './pages/ScreenAnalysis';
import Recordings from './pages/Recordings';
import Admin from './pages/Admin';

// App Layout wrapper containing the Sidebar
function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

// Protected Route Component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          
          {/* Protected Area (SaaS App) */}
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/history' element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
          
          <Route path='/conversations' element={<PrivateRoute><Conversations /></PrivateRoute>} />
          <Route path='/document-review' element={<PrivateRoute><DocumentReview /></PrivateRoute>} />
          <Route path='/screen-analysis' element={<PrivateRoute><ScreenAnalysis /></PrivateRoute>} />
          <Route path='/recordings' element={<PrivateRoute><Recordings /></PrivateRoute>} />
          <Route path='/analytics' element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
