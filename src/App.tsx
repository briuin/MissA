import Calculator from './Calculator';
import AuthHeader from './components/AuthHeader';
import { ToastProvider } from './context/ToastContext';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <div className="App flex flex-col min-h-screen">
        <AuthHeader />
        <div className="flex-grow">
          <Calculator />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
