import { useAuth } from 'react-oidc-context';
import Calculator from './Calculator';

function AuthButtons() {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Encountering error... {auth.error.message}</div>;
  if (auth.isAuthenticated) {
    return (
      <div>
        <span>Signed in as {auth.user?.profile?.email || 'User'}</span>
        <button onClick={() => auth.removeUser()}>Sign Out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign In</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AuthButtons />
      <Calculator />
    </div>
  );
}

export default App;
