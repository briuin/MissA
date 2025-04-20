import { useState, useEffect, useRef } from 'react';
import { useAuth } from 'react-oidc-context';
import './AuthHeader.css';

const AuthHeader = () => {
  const auth = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    auth.signinRedirect();
  };

  // Handle sign-out button click
  const handleSignOut = () => {
    auth.removeUser();
    setDropdownOpen(false);
  };

  if (auth.isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <span className="loading-icon"></span>
          <span>Loading authentication...</span>
        </div>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="error-container">
        <div className="error-alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Authentication Error</h3>
            <div className="text-sm">{auth.error.message}</div>
          </div>
          <button className="btn btn-sm" onClick={() => auth.signinRedirect()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="auth-header">
      <div className="auth-header-title">Astrological Insights</div>
      
      {auth.isAuthenticated ? (
        <div className="user-dropdown" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{auth.user?.profile?.email || auth.user?.profile?.name || 'User'}</span>
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="user-name">{auth.user?.profile?.name || 'User'}</div>
                  <div className="user-email">{auth.user?.profile?.email}</div>
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
    </header>
  );
};

export default AuthHeader;
