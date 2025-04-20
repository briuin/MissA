import React from 'react';

export interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  return (
    <div className={`toast-container toast-${type}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default Toast;
