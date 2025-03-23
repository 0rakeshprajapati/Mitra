import React from 'react';
import mitraImage from '../assets/Chingu.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="flex flex-col items-start justify-start h-screen bg-black"> {/* Align items to the start */}
      {/* Header Section */}
      <div className="flex items-center p-4">
        {/* Heart Icon */}
        <FontAwesomeIcon icon={faHeart} className="text-[#ffbe00] text-3xl" />
        <h1 className="text-[#ffffff] text-3xl ml-2">VIT</h1>
      </div>

      {/* Banner Section */}
      <div className="flex w-full max-w-6xl p-8 bg-black shadow-lg rounded-lg mt-4">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-9xl font-bold" style={{ fontFamily: 'Italianno, cursive' }}>
            <span className="text-[#ffbe00]">Mit</span>
            <span className="text-white">ra</span>
          </h1>
          
          {/* Wrapping the paragraphs in a container for proper stacking */}
          <div className="text-center">
            <p className="text-[#ffbe00] text-5xl mt-4" style={{ fontFamily: 'Italianno, cursive' }}>Your Lifeline to Health</p>
            <p className="text-[#ffbe00] text-xl">and Safety, Anytime, Anywhere</p>
            {/* Login and Signup Buttons */}
            <div className="mt-8">
              <a 
                href="/login" 
                className="bg-[#ffbe00] text-black py-2 px-4 rounded hover:bg-opacity-80 transition duration-300 mx-2"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="bg-[#ffbe00] text-black py-2 px-4 rounded hover:bg-opacity-80 transition duration-300 mx-2"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex-1 flex items-center justify-center">
          <img 
            src={mitraImage} 
            alt="Mitra" 
            className="transition-transform duration-300 transform hover:scale-105" // Add scaling effect
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
