import React from 'react';

// === Widget Toggle Component (Floating Button) ===
function WidgetToggle({ onOpen }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <button
        onClick={onOpen}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: 'none',
          background: '#007bff',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        👤
      </button>
    </div>
  );
}

export default WidgetToggle; 