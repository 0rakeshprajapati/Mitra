import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import DashBoardPatient from './components/DashBoardPatient';
import DashBoardDoctor from './components/DashBoardDoctor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Homepage */}
          <Route path="/signup" element={<SignUp />} /> {/* SignUp page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/doctor" element={<DashBoardDoctor />} /> {/* Doctor dashboard */}
          <Route path="/patient" element={<DashBoardPatient />} /> {/* Patient dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
