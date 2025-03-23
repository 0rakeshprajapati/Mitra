import React from 'react';

const NavbarPatient = ({ setView }) => {
  return (
    <nav className="bg-[#ffbe00] text-black p-4 flex justify-around shadow-md rounded-md">
      <button
        onClick={() => setView('patientInfo')}
        className="bg-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300 hover:bg-opacity-80 shadow-sm"
      >
        Patient Info
      </button>
      <button
        onClick={() => setView('checkVitals')}
        className="bg-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300 hover:bg-opacity-80 shadow-sm"
      >
        Check Vitals
      </button>
      <button
        onClick={() => setView('weeklyReport')}
        className="bg-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300 hover:bg-opacity-80 shadow-sm"
      >
        Weekly Report
      </button>
      <button
        onClick={() => setView('appointmentScheduling')}
        className="bg-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300 hover:bg-opacity-80 shadow-sm"
      >
        Appointment Scheduling
      </button>
      <button
        onClick={() => setView('logOut')}
        className="bg-white py-2 px-4 rounded-lg hover:scale-105 transform transition duration-300 hover:bg-opacity-80 shadow-sm"
      >
        Log Out
      </button>
    </nav>
  );
};

export default NavbarPatient;
