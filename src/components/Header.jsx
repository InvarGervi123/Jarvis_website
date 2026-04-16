import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <header className="header-glass">
      <div className="container header-content">
        <Link to="/" className="logo-box">
          <span className="logo-icon">💠</span>
          <h2 className="text-gradient">JARVIS</h2>
        </Link>
        
        <nav className="nav-links">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-item">Dashboard</Link>
              <Link to="/history" className="nav-item">History</Link>
              <Link to="/settings" className="nav-item">Settings</Link>
              <button onClick={handleLogout} className="btn-secondary btn-small">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary btn-small">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}