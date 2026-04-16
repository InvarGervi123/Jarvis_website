import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BrainCircuit, Zap, Shield, Globe, Cpu, Sparkles } from 'lucide-react';
import './Home.css';

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar for Landing Page */}
      <nav className="landing-nav">
        <div className="logo-glow">JARVIS</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#demo">Integration</a>
          {currentUser ? (
            <button onClick={() => navigate('/dashboard')} className="btn-primary">Enter Dashboard</button>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-primary">Initialize Access</button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge-glow"><Sparkles size={16}/> S.I.V.R.A.J Network Active</div>
          <h1 className="hero-title">Next-Gen Browsing <br/><span className="text-gradient">Intelligence</span></h1>
          <p className="hero-subtitle">
            Highlight text anywhere. Execute AI commands instantly. 
            Summarize, explain, and rewrite across the web with the Jarvis OS Extension.
          </p>
          <div className="hero-actions">
            {!currentUser ? (
              <Link to="/login" className="btn-primary" style={{padding: '16px 32px', fontSize: '1.2rem'}}>Start Terminal</Link>
            ) : (
              <Link to="/dashboard" className="btn-primary" style={{padding: '16px 32px', fontSize: '1.2rem'}}>Open Dashboard</Link>
            )}
            <a href="#features" className="btn-secondary" style={{padding: '16px 32px', fontSize: '1.2rem'}}>View Docs</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow-sphere"></div>
          <div className="glow-sphere second"></div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Core Capabilities</h2>
          <p>Engineered for maximum internet efficiency.</p>
        </div>
        <div className="features-grid">
          <FeatureCard 
            icon={<Zap size={32} color="#00d2ff" />}
            title="Instant Execution"
            desc="Select text on any webpage and execute AI functions directly from the Chrome extension."
          />
          <FeatureCard 
            icon={<BrainCircuit size={32} color="#00d2ff" />}
            title="Gemini 2.5 Flash"
            desc="Powered by Google's latest hyper-fast LLM architectures for real-time natural language processing."
          />
          <FeatureCard 
            icon={<Shield size={32} color="#00d2ff" />}
            title="Data Security"
            desc="Your query history is securely synced to your personal Firebase Firestore identity."
          />
          <FeatureCard 
            icon={<Globe size={32} color="#00d2ff" />}
            title="Universal Translation"
            desc="Dynamically translate explanations and summaries into dozens of languages via settings."
          />
          <FeatureCard 
            icon={<Cpu size={32} color="#00d2ff" />}
            title="Centralized Analytics"
            desc="Monitor your interaction metrics, token usage, and search patterns from an Iron Man inspired dashboard."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="logo-glow" style={{fontSize: '1.2rem'}}>JARVIS</div>
        <p>Advanced Agentic Web Interface © 2026</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-panel feature-card">
      <div className="feature-icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
