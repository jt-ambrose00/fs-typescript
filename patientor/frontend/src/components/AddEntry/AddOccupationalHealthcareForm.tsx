import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, SelectChangeEvent, InputLabel, Select, MenuItem, Input } from '@mui/material';

import { OccupationalHealthcareEntryFormValues, Diagnosis } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  diagnoses: Diagnosis[] | undefined;
}

const AddOccupationalHealthcareForm = ({ onClose, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate,
        endDate
      }
    });
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setEmployerName('');
    setStartDate('');
    setEndDate('');
  };

  const handleDiagnosisCodes = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <form onSubmit={addEntry}>
      <TextField
        label="Description"
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <InputLabel htmlFor="dateLabel">Date</InputLabel>
      <Input
        id="dateLabel"
        type="date"
        placeholder="YYYY-MM-DD"
        fullWidth
        required
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <InputLabel id="diagnosisCodesLabel">Diagnosis Codes</InputLabel>
      <Select
        labelId="diagnosisCodesLabel"
        fullWidth
        multiple
        value={diagnosisCodes}
        onChange={handleDiagnosisCodes}
      >
        {diagnoses?.map((diagnosis) => (
          <MenuItem
            key={diagnosis.code}
            value={diagnosis.code}
          >
            {diagnosis.code} - {diagnosis.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Employer name"
        fullWidth
        required
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel htmlFor="sickLeaveStartLabel">Sick leave start</InputLabel>
      <Input
        id="sickLeaveStartLabel"
        type="date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <InputLabel htmlFor="sickLeaveEndLabel">Sick leave end</InputLabel>
      <Input
        id="sickLeaveEndLabel"
        type="date"
        placeholder="YYYY-MM-DD"
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
