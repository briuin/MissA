import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './AuthHeader.css';

const AuthHeader = () => {
  const { user, loading, error, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <span className="loading-icon"></span>
          <span>Loading authentication...</span>
        </div>
      </div>
    );
  }

  return (
    <header className="auth-header">
      <div className="auth-header-title">Astrological Insights</div>
      
      {user && user.isAuthenticated ? (
        <div className="user-dropdown" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{user.email || 'User'}</span>
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="user-email">{user.email}</div>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="signout-button"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
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
