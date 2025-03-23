import React, { useState } from 'react';
import NavbarPatient from './NavbarPatient';
import PatientInfo from './PatientInfo';
import CheckVitals from './CheckVitals';

const DashBoardPatient = () => {
  const [view, setView] = useState('patientInfo');

  return (
    <div>
      <NavbarPatient setView={setView} />
      <div className="p-4">
        {view === 'patientInfo' && <PatientInfo />}
        {view === 'checkVitals' && <CheckVitals />}
      </div>
    </div>
  );
};

export default DashBoardPatient;
