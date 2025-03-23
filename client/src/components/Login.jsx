import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import mitraImage from '../assets/image.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Doctor'); // Default role selection
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
      const data = response.data;

      if (response.status === 200) {
        alert(`Login successful as ${data.user.role}`);

        // Store user details in localStorage
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userRole', data.user.role);

        // Navigate based on the user's role
        if (data.user.role === 'Patient') {
          navigate('/Patient'); // Navigate to the patient dashboard
        } else if (data.user.role === 'Doctor') {
          navigate('/Doctor'); // Navigate to the doctor dashboard
        }
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 flex items-center justify-center">
        <img src={mitraImage} alt="Background" className="object-cover h-3/4" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="text-center mb-4 text-6xl" style={{ fontFamily: 'Italianno, cursive' }}>
          <span className="text-white">Mit</span>
          <span className="text-[#ffbe00]">ra</span>
        </div>
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <form className="space-y-4" onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold text-center text-black mb-2">Login</h2>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ffbe00] focus:border-[#ffbe00]"
                placeholder="Email address"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ffbe00] focus:border-[#ffbe00]"
                placeholder="Password"
                required
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Doctor"
                    checked={role === 'Doctor'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-[#ffbe00] border-gray-300 focus:ring-[#ffbe00]"
                  />
                  <span className="ml-2 text-gray-700">Doctor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Patient"
                    checked={role === 'Patient'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-[#ffbe00] border-gray-300 focus:ring-[#ffbe00]"
                  />
                  <span className="ml-2 text-gray-700">Patient</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-[#ffbe00] hover:bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbe00]"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#ffbe00] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;