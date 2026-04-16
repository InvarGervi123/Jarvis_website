import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  MonitorPlay, 
  Mic, 
  History, 
  BarChart, 
  Settings, 
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-glow">JARVIS</div>
        <div className="version-badge">v2.0</div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/conversations" className="nav-item">
          <MessageSquare size={20} />
          <span>Conversations</span>
        </NavLink>
        <NavLink to="/document-review" className="nav-item">
          <FileText size={20} />
          <span>Document Review</span>
        </NavLink>
        <NavLink to="/screen-analysis" className="nav-item">
          <MonitorPlay size={20} />
          <span>Screen Analysis</span>
        </NavLink>
        <NavLink to="/recordings" className="nav-item">
          <Mic size={20} />
          <span>Recordings</span>
        </NavLink>
        <NavLink to="/history" className="nav-item">
          <History size={20} />
          <span>History & Search</span>
        </NavLink>
        <NavLink to="/analytics" className="nav-item">
          <BarChart size={20} />
          <span>Analytics</span>
        </NavLink>
        <div className="nav-divider"></div>
        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/admin" className="nav-item">
          <ShieldAlert size={20} />
          <span>Admin Panel</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  );
}
