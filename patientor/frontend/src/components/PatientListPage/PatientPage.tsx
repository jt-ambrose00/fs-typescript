import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Patient } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="App">
      <Box>
        <Typography variant="h6">
          {patient.name}
        </Typography>
        <Typography>
          gender: {patient.gender}
        </Typography>
        <Typography>
          ssn: {patient.ssn}
        </Typography>
        <Typography>
          occupation: {patient.occupation}
        </Typography>
        <Typography>
          date of birth: {patient.dateOfBirth}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientPage;
