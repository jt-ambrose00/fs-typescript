import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from './EntryDetails';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="App">
      <Box>
        <Typography variant='h5' fontWeight='bold' mb={2}>
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
        <Typography variant='h6' fontWeight='bold' my={2}>
          Entries
        </Typography>
        {patient.entries.length === 0 && <Typography>No entries...</Typography>}
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;
