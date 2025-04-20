import Calculator from './Calculator';
import AuthHeader from './components/AuthHeader';
import './App.css';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <AuthHeader />
      <div className="flex-grow">
        <Calculator />
      </div>
    </div>
  );
}

export default App;
