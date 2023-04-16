import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyCarsPage from './pages/MyCarsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/cars/myCars" element={<MyCarsPage />}/>
        </Routes>

        
      </header>
    </div>
  );
}

export default App;
