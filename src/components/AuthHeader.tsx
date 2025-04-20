import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLoadingStore } from '../store/ui.store';
import AuthModal from './AuthModal';
import './AuthHeader.css';

const AuthHeader = () => {
  const { user, loading, error, signOut, clearError } = useAuth();
  const { show: showLoading, hide: hideLoading } = useLoadingStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle global loading state based on auth loading state
  useEffect(() => {
    if (loading) {
      showLoading("Loading authentication...");
    } else {
      hideLoading();
    }
  }, [loading, showLoading, hideLoading]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sign-in button click
  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  // Handle sign-out button click
  const handleSignOut = () => {
    signOut();
    setDropdownOpen(false);
  };

  // Don't render anything while loading as it's handled by the global LoadingOverlay
  // if (loading) {
  //   return null;
  // }
  
  return (
    <header className="auth-header">
      <div className="auth-header-title">Astrological Insights</div>
      
      {user && user.isAuthenticated ? (
        <div className="dropdown dropdown-end" ref={dropdownRef}>
          <label 
            tabIndex={0} 
            className="btn btn-ghost btn-circle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center overflow-hidden">
              <span className="text-lg font-semibold leading-none">{user.email?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
          </label>
          
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box ">
            <li className="p-2 text-center border-b border-base-300">
              <div className="font-semibold text-sm truncate ">{user.email}</div>
            </li>
            <li className="p-1">
              <button 
                onClick={handleSignOut}
                className="btn btn-sm btn-ghost justify-start w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="auth-buttons">
          <button 
            onClick={handleSignIn}
            className="btn btn-primary signin-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </button>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default AuthHeader;
