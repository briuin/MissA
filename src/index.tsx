import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_GFL3aUgeQ', // TODO: Replace with your OIDC provider
  client_id: '7ch4ftpn2kogvsnqr0d4eumjic', // TODO: Replace with your client ID
  redirect_uri: window.location.origin, // TODO: Replace with your redirect URI
  response_type: 'code',
  scope: 'openid email phone',
  automaticSilentRenew: true,
  loadUserInfo: true,
  monitorSession: true,
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider {...oidcConfig}>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
