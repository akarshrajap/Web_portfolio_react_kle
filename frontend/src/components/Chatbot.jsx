import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I am Akarsh's virtual assistant. Ask me anything about his programming workflows, projects, experience, or skills!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setError(null);
  };

  const getChatApiUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl) {
      if (envUrl.endsWith('/api/contact')) {
        return envUrl.replace('/api/contact', '/api/chat');
      }
      return envUrl.endsWith('/') ? `${envUrl}api/chat` : `${envUrl}/api/chat`;
    }
    return 'http://localhost:5000/api/chat';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message to history
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const chatHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch(getChatApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: chatHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get a response from assistant.');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Connection lost. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Button */}
      <button 
        onClick={toggleChat} 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle assistant chat"
        id="btn-toggle-chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" id="chat-window-container">
          <div className="chat-header">
            <h3>ASSISTANT / AKARSH RAJ</h3>
            <button onClick={toggleChat} aria-label="Close chat" className="chat-close-link">
              CLOSE
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message-row ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}
              >
                <div className="msg-meta">
                  {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                </div>
                <div className="msg-content">
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-row msg-ai msg-typing">
                <div className="msg-meta">ASSISTANT</div>
                <div className="msg-content typing-indicator">
                  THINKING...
                </div>
              </div>
            )}

            {error && (
              <div className="chat-error-row">
                <span>ERROR: {error}</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              required
              aria-label="Type your message"
              id="input-chat-message"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="chat-send-btn"
              id="btn-send-chat"
            >
              SEND
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
