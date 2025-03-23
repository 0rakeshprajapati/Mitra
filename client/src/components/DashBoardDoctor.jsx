import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashBoardDoctor = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[#378f68]">Doctor Dashboard</h1>
      <p className="mt-4 text-gray-700">Welcome, Doctor! Manage your appointments and patient records here.</p>
      <button
        className="mt-6 px-6 py-2 text-white bg-[#378f68] rounded-md hover:bg-opacity-80"
        onClick={() => navigate('/logout')}
      >
        Logout
      </button>
    </div>
  );
};

export default DashBoardDoctor;
