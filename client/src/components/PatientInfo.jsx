import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientInfo = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="p-6 bg-gray-100 w-3/5 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Information</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{patient.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {patient.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Age:</span> {patient.age}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Gender:</span> {patient.gender}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Height:</span> {patient.height} cm
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Weight:</span> {patient.weight} kg
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Special Condition:</span> {patient.specialCondition || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Assigned Doctor:</span>{' '}
                {patient.assignedDoctor ? patient.assignedDoctor.name : 'Unassigned'}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/5 bg-white border-l border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Additional Insights</h2>
        <div className="mb-6">
          <p className="text-lg text-gray-700 font-medium">Quick Stats:</p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Total Patients: {patients.length}</li>
            <li>Assigned Doctors: {patients.filter((p) => p.assignedDoctor).length}</li>
            <li>Special Cases: {patients.filter((p) => p.specialCondition).length}</li>
          </ul>
        </div>
        <iframe
          src="https://example.com" // Replace with a valid URL or your desired content source
          title="Additional Information"
          className="w-full h-[70%] border rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default PatientInfo;
