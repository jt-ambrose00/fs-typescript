import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

import { Patient, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from './EntryDetails';
import AddEntry from '../AddEntry/index';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!patient?.id) return;
      const entry = await patientService.createEntry(values, patient.id);
      setPatient({
        ...patient,
        entries: [...patient.entries, entry]
      });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message = `${e.response?.data.error[0].path[0]}: ${e.response?.data.error[0].message}`;
        setError(message);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
        <AddEntry
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={error}
        />
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ mt : 5, mb: 3 }}
        >
          Add New Entry
        </Button>
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
