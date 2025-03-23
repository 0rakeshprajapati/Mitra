import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckVitals = () => {
  const [vital, setVital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded patientId
  const patientId = '67df56d63cbba272b7727ae3';

  useEffect(() => {
    const fetchVital = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vitals/${patientId}`);
        setVital(response.data);
      } catch (err) {
        console.error('Error fetching vitals:', err);
        setError(err.response?.data?.message || 'Failed to fetch vitals');
      } finally {
        setLoading(false);
      }
    };

    fetchVital();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading vital record...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;
  }

  const handleDownloadReport = () => {
    navigate('/weekly-report');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Most Recent Vital Record</h2>
        <button
          onClick={handleDownloadReport}
          className="px-4 py-2 bg-[#ffbe00] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105"
        >
          Download Weekly Report
        </button>
      </div>
      {vital && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg font-semibold text-gray-800 mb-4">{vital.name}</p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Date:</span> {new Date(vital.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Blood Pressure:</span> {vital.vitals.bloodPressure}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Heart Rate:</span> {vital.vitals.heartRate} bpm
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Oxygen Level:</span> {vital.vitals.oxygenLevel} %
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Temperature:</span> {vital.vitals.temperature} °F
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Respiration Rate:</span> {vital.vitals.respirationRate} breaths/min
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckVitals;