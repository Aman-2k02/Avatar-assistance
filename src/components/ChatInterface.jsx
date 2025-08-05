import React, { useRef, useEffect } from 'react';

// === Chat Interface Component ===
function ChatInterface({
  chatHistory,
  userInput,
  isListening,
  onInputChange,
  onTextSubmit,
  onStartListening,
  isMinimized,
  setChatHistory,
  onAddMilestone
}) {
  if (isMinimized) return null;

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);
  
  return (
    <div
      style={{
        padding: 15,
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Chat History */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: 10,
          maxHeight: '120px',
        }}
      >
        {chatHistory?.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: 6,
              padding: 6,
              borderRadius: 6,
              background:
                message.type === 'user'
                  ? 'rgba(0, 123, 255, 0.3)'
                  : 'rgba(40, 167, 69, 0.3)',
              textAlign: message.type === 'user' ? 'right' : 'left',
              fontSize: '12px',
            }}
          >
            <strong>{message.type === 'user' ? 'You' : 'Avatar'}:</strong> {message.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {/* Input box */}
      <input
        type="text"
        value={userInput}
        onChange={onInputChange}
        placeholder="Type your message..."
        style={{
          width: '100%',
          padding: 8,
          borderRadius: 4,
          border: 'none',
          background: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          fontSize: '12px',
          marginBottom: 8,
        }}
        onKeyPress={(e) => e.key === 'Enter' && onTextSubmit(e)}
      />
      {/* All buttons in a row below input */}
      <div className="chat-controls" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          onClick={onAddMilestone}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: 'none',
            background: '#6f42c1',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Add Milestone
        </button>
        <button
          onClick={onTextSubmit}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: 'none',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Send
        </button>
        <button
          onClick={onStartListening}
          disabled={isListening}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: 'none',
            background: isListening ? '#dc3545' : '#28a745',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          {isListening ? '🎤' : '🎤'}
        </button>
        <button
          onClick={() => setChatHistory([])}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: 'none',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Clear
        </button>
        <button
          onClick={() => chatEndRef.current && chatEndRef.current.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: 'none',
            background: '#ffc107',
            color: 'black',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Go to Latest
        </button>
      </div>
    </div>
  );
}

export default ChatInterface; 