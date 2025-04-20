import React, { useEffect, useState } from 'react';

export interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    // Auto close toast after duration
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation before unmounting
      setTimeout(onClose, 300);
    }, duration);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const getAlertClass = () => {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-error';
      case 'warning': return 'alert-warning';
      case 'info': return 'alert-info';
      default: return 'alert-success';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="toast toast-top toast-end z-50">
      <div 
        className={`
          alert ${getAlertClass()} shadow-lg rounded-lg border
          transform transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{ minWidth: '300px', maxWidth: '100%' }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
          <div className="ml-3 flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button 
              className="inline-flex rounded-md bg-transparent text-current hover:opacity-75 focus:outline-none"
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
