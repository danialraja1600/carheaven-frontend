import './App.css';
import { Routes, Route } from 'react-router-dom';
//Car components
import MyCarsPage from './pages/MyCarsPage';
import EditCarPage from './pages/EditCarPage';
import CarDetailsPage from './pages/CarDetailsPage';
//Event components
import MyEventsPage from './pages/MyEventsPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import EditEventPage from './pages/EditEventPage';
//General components
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
//Utils
import IsPrivate from './components/IsPrivate';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/events" element={<EventsPage />} />
          
          <Route
            path="/cars/myCars" element={ <MyCarsPage /> }
          />

          <Route path="/cars/edit/:carId" element={<IsPrivate><EditCarPage /> </IsPrivate>} 
          />

          <Route 
            path="/cars/:carId" element={<IsPrivate> <CarDetailsPage /> </IsPrivate>}
          />

          <Route
            path="/events/myEvents" element={<MyEventsPage />} 
          />

          <Route 
            path="/events/:eventId" element={<IsPrivate> <EventDetailsPage /> </IsPrivate>}
          />

          <Route path="/events/edit/:eventId" element={<IsPrivate><EditEventPage /> </IsPrivate>} 
          />

        </Routes>
      </header>
    </div>
  );
}

export default App;
