import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Input, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import { HealthCheckEntryFormValues, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  diagnoses: Diagnosis[] | undefined;
}

const AddHealthCheckForm = ({ onClose, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating
    });
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
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
      <InputLabel id="healthCheckRatingLabel">Health Check Rating</InputLabel>
      <Select
        labelId="healthCheckRatingLabel"
        fullWidth
        required
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
      >
        <MenuItem value={0}>0 - Healthy</MenuItem>
        <MenuItem value={1}>1 - Low Risk</MenuItem>
        <MenuItem value={2}>2 - High Risk</MenuItem>
        <MenuItem value={3}>3 - Critical Risk</MenuItem>
      </Select>
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

export default AddHealthCheckForm;
