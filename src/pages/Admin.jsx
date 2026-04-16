import React from 'react';
export default function Admin() {
  return (
    <div className="page-wrapper">
      <h1 className="page-title text-gradient" style={{color: '#ef4444'}}>Admin Panel</h1>
      <div className="glass-panel" style={{height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #ef4444'}}>
        <h2 style={{color: '#ef4444'}}>Access Denied. You do not have Level 5 clearance.</h2>
      </div>
    </div>
  );
}
