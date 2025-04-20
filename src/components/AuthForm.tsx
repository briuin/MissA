import React, { useState } from 'react';

interface AuthFormProps {
  formType: 'signup' | 'signin';
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
  loading: boolean;
  onToggleForm: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  onSubmit,
  error,
  loading,
  onToggleForm
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(email, password);
    } catch (err) {
      // Error is handled by the parent component
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="form-title">{formType === 'signup' ? 'Create Account' : 'Sign In'}</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your-email@example.com"
            className={error ? 'input-error border-2 border-error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={formType === 'signup' ? 'Create password' : 'Enter password'}
            className={error ? 'input-error border-2 border-error' : ''}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary submit-button"
          disabled={loading}
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            formType === 'signup' ? 'Sign Up' : 'Sign In'
          )}
        </button>
      </form>
      
      <div className="form-toggle">
        {formType === 'signup' ? (
          <p>Already have an account? <button onClick={onToggleForm} className="toggle-link">Sign In</button></p>
        ) : (
          <p>Don't have an account? <button onClick={onToggleForm} className="toggle-link">Sign Up</button></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
