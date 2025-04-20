import React, { useState, useRef, useEffect } from 'react';
import AuthForm from './AuthForm';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmSignUpForm: React.FC<{
  email: string;
  onConfirm: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  loading: boolean;
  error: string | null;
}> = ({ email, onConfirm, onResend, loading, error }) => {
  const [code, setCode] = useState('');
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(code);
  };

  const handleResend = async () => {
    await onResend();
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="auth-form-container">
      <h2 className="form-title">Enter Confirmation Code</h2>
      <p className="text-sm mb-2">
        A confirmation code was sent to <b>{email}</b>.
      </p>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="code">Confirmation Code</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
            placeholder="Enter code"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-button"
          disabled={loading}
        >
          {loading ? <span className="loading-spinner"></span> : 'Confirm'}
        </button>
      </form>
      <div className="form-toggle mt-2">
        <button
          type="button"
          className="toggle-link"
          onClick={handleResend}
          disabled={loading}
        >
          Resend Code
        </button>
        {resent && <span className="ml-2 text-green-600">Code resent!</span>}
      </div>
    </div>
  );
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [formType, setFormType] = useState<'signin' | 'signup'>('signin');
  const {
    signIn,
    signUp,
    error,
    loading,
    clearError,
    needsConfirmation,
    signUpEmail,
    confirmSignUp,
    resendConfirmation,
  } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    clearError();
    onClose();
  };

  const toggleForm = () => {
    clearError();
    setFormType(formType === 'signin' ? 'signup' : 'signin');
  };

  const handleSubmit = async (email: string, password: string) => {
    try {
      if (formType === 'signin') {
        await signIn(email, password);
        // First close the modal
        handleClose();
        // Then show the toast notification
        setTimeout(() => {
          showToast('Signed in successfully!', 'success');
        }, 300);
      } else {
        await signUp(email, password);
        // For sign up, keep modal open for confirmation
        // but still show toast
        showToast(
          'Sign up successful! Please check your email for the confirmation code.',
          'success',
        );
        // Do NOT close the modal here, wait for confirmation
      }
    } catch (err) {
      // Show error toast if there's an issue
      showToast(error || 'An error occurred', 'error');
      // Error is handled by the auth context
    }
  };

  const handleConfirm = async (code: string) => {
    try {
      await confirmSignUp(code);
      handleClose();
      // Modal will be closed after toast is shown
      setTimeout(() => {
        showToast('Account confirmed! You can now sign in.', 'success');
      }, 300);
    } catch (err) {
      // Show error toast if there's an issue with confirmation
      showToast(error || 'Error confirming account', 'error');
      // Error handled by context
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal" ref={modalRef}>
        <button className="close-button" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {needsConfirmation && signUpEmail ? (
          <ConfirmSignUpForm
            email={signUpEmail}
            onConfirm={handleConfirm}
            onResend={resendConfirmation}
            loading={loading}
            error={error}
          />
        ) : (
          <AuthForm
            formType={formType}
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            onToggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
