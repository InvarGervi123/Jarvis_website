import React from 'react';
export default function Recordings() {
  return (
    <div className="page-wrapper">
      <h1 className="page-title text-gradient">Voice Recordings & Dictation</h1>
      <div className="glass-panel" style={{height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h2 style={{color: '#8b9bb4'}}>Audio buffers empty. No recordings found.</h2>
      </div>
    </div>
  );
}
