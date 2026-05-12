import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

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
        <Typography variant='h6' fontWeight='bold' my={2}>Entries</Typography>
        {patient.entries.length === 0 && <Typography>No entries...</Typography>}
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <Typography>
              <Box component='span' fontWeight='bold'>{entry.date}: </Box> {entry.description}
            </Typography>
            <List sx={{ listStyleType: 'disc', pl: 2 }}>
              {entry.diagnosisCodes?.map((code) => (
                <ListItem key={code} sx={{ display: 'list-item', py: 0 }}>
                  <ListItemText>{code}</ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default PatientPage;
