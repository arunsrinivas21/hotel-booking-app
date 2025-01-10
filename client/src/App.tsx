import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './AppContext';
import Home from './components/Home';
import About from './components/About';
import RoomDetails from './components/RoomDetails';
import BookingHistory from './components/BookingHistory';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/room-details/:roomId" element={<RoomDetails />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;