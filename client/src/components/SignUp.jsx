import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import yourImage from '../assets/image.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    specialCondition: '',
    assignedDoctor: '', // New field for doctor selection
  });

  const [doctors, setDoctors] = useState([]); // State to store doctor list
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.role === 'Patient') {
      fetchDoctors();
    }
  }, [formData.role]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const validateData = () => {
    const { name, email, password } = formData;
    let valid = true;

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError((prev) => ({ ...prev, name: 'Name should only contain letters and spaces.' }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, name: '' }));
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, email: '' }));
    }

    if (password.length < 8) {
      setError((prev) => ({ ...prev, password: 'Password must be at least 8 characters long.' }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, password: '' }));
    }

    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateData()) return;

    const userData = {
      ...formData,
      role: formData.role || 'Patient', // Default to 'Patient' if not selected
      assignedDoctor: formData.role === 'Patient' ? formData.assignedDoctor : null, // Add doctor for patients
    };

    try {
      await axios.post('http://localhost:5000/api/auth/signup', userData);
      navigate(userData.role === 'Patient' ? '/patient' : '/doctor');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      setError((prev) => ({ ...prev, general: 'Signup failed. Please try again.' }));
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 flex items-center justify-center">
        <img src={yourImage} alt="Background" className="object-cover h-3/4" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {error.general && <p className="text-red-500 text-center">{error.general}</p>}
        <div className="text-center mb-4 text-6xl" style={{ fontFamily: 'Italianno, cursive' }}>
          <span className="text-white">Mit</span>
          <span className="text-[#ffbe00]">ra</span>
        </div>
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-black mb-2">Sign Up</h2>
            <input name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full px-3 py-2 border rounded-md" />
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full px-3 py-2 border rounded-md" />
            <input name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border rounded-md" />
            <div className="flex items-center space-x-4">
              <input type="radio" id="patient" name="role" value="Patient" checked={formData.role === 'Patient'} onChange={handleChange} />
              <label htmlFor="patient">Patient</label>
              <input type="radio" id="doctor" name="role" value="Doctor" checked={formData.role === 'Doctor'} onChange={handleChange} />
              <label htmlFor="doctor">Doctor</label>
            </div>
            {formData.role === 'Patient' && (
              <>
                <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full px-3 py-2 border rounded-md" />
                <input name="height" type="text" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="w-full px-3 py-2 border rounded-md" />
                <input name="weight" type="text" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-full px-3 py-2 border rounded-md" />
                <div className="flex space-x-4">
                  <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                  <label htmlFor="male">Male</label>
                  <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                  <label htmlFor="female">Female</label>
                </div>
                <select name="assignedDoctor" value={formData.assignedDoctor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                <input name="specialCondition" type="text" value={formData.specialCondition} onChange={handleChange} placeholder="Special Condition" className="w-full px-3 py-2 border rounded-md" />
              </>
            )}
            <button type="submit" className="w-full py-2 text-black bg-[#ffbe00] rounded-md hover:bg-opacity-80">
              {formData.role === 'Doctor' ? 'Continue' : 'Sign Up'}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-[#ffbe00] font-semibold">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
