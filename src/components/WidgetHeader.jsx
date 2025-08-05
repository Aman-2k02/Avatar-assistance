import React from 'react';

// === Widget Header Component ===
function WidgetHeader({ isMinimized, onMinimize, onClose }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        background: 'rgba(67, 158, 255, 0.2)',
        borderRadius: '13px 13px 0 0',
        borderBottom: '1px solid #007bff',
      }}
    >
      <span style={{ color: 'white', fontWeight: 'bold' }}>AI Avatar Assistant</span>
      <div>
        <button
          onClick={onMinimize}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            marginRight: 10,
            fontSize: '16px',
          }}
        >
          {isMinimized ? '⛶' : '⛶'}
        </button>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default WidgetHeader; 