import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from '@mui/material';

import { OccupationalHealthcareEntryFormValues } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const AddOccupationalHealthcareForm = ({ onClose, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(','),
      employerName,
      sickLeave: {
        startDate,
        endDate
      }
    });
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setEmployerName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={addEntry}>
      <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Diagnosis Codes"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <TextField
        label="Employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        label="Sick leave start"
        fullWidth
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <TextField
        label="Sick leave end"
        fullWidth
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Grid size="auto">
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid size="auto">
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddOccupationalHealthcareForm;
