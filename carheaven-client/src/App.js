import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        
        <Routes>
          <Route path="/" element={<HomePage />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
