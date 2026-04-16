import React, { useState } from 'react';
import { Send, Menu, Bot, User, ImagePlus, Mic } from 'lucide-react';
import './Conversations.css';

export default function Conversations() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'S.I.V.R.A.J Network Online. How may I assist you today, Operator?' },
    { id: 2, sender: 'user', text: 'Can you analyze the recent queries and find any patterns?' },
    { id: 3, sender: 'bot', text: 'Processing... Based on your recent History logs, most queries (84%) relate to summarizing technical documentation. Your peak productivity hours are between 14:00 - 18:00.' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if(!inputText.trim()) return;
    
    const newUserMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages([...messages, newUserMsg]);
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'I am currently operating in standalone mock iteration mode. S.I.V.R.A.J LLM core integration will be bound to this UI in the next patch.'
      }]);
    }, 1000);
  };

  return (
    <div className="page-wrapper conversations-page">
      <div className="chat-layout">
        <aside className="chat-sidebar glass-panel">
          <div className="sidebar-header">
            <h3>Active Threads</h3>
            <button className="icon-btn"><Menu size={18}/></button>
          </div>
          <div className="thread-list">
            <div className="thread-item active">
              <div className="thread-title">System Analysis</div>
              <div className="thread-preview">S.I.V.R.A.J Network Onl...</div>
            </div>
            <div className="thread-item">
              <div className="thread-title">Weekly Summaries</div>
              <div className="thread-preview">Here is your weekly bre...</div>
            </div>
            <div className="thread-item">
              <div className="thread-title">Data Extraction</div>
              <div className="thread-preview">Extraction complete for...</div>
            </div>
          </div>
        </aside>

        <main className="chat-main glass-panel">
          <div className="chat-header">
            <div className="chat-title-group">
              <h2 className="chat-active-title">System Analysis</h2>
              <span className="status-badge">🟢 Secure Connection</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((m) => (
              <div key={m.id} className={`message-wrapper ${m.sender === 'user' ? 'msg-right' : 'msg-left'}`}>
                <div className="message-bubble">
                  <div className="msg-icon">
                    {m.sender === 'user' ? <User size={16} /> : <Bot size={16} color="#00d2ff"/>}
                  </div>
                  <div className="msg-text">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="chat-input-area">
            <button type="button" className="action-icon"><ImagePlus size={20}/></button>
            <button type="button" className="action-icon"><Mic size={20}/></button>
            <input 
              type="text" 
              className="cyber-input" 
              placeholder="Command S.I.V.R.A.J network..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="send-btn"><Send size={18}/></button>
          </form>
        </main>
      </div>
    </div>
  );
}
