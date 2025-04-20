import React from 'react';
import { useLoadingStore } from '../store/ui.store';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

// Local component for direct usage within components
export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-base-100/80 z-50'
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-2 bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        {message && <p className="text-center font-medium mt-2">{message}</p>}
      </div>
    </div>
  );
};

// Global loading overlay that uses the Zustand store
export const LoadingOverlay: React.FC = () => {
  const { isLoading, message } = useLoadingStore();
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 z-[5000]">
      <div className="flex flex-col items-center gap-2 bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        {message && <p className="text-center font-medium mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Loading;
