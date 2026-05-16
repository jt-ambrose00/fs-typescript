import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, SelectChangeEvent, InputLabel, Select, MenuItem, Input } from '@mui/material';

import { HospitalEntryFormValues, Diagnosis } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  diagnoses: Diagnosis[] | undefined;
}

const AddHospitalForm = ({ onClose, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    });
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
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
      <InputLabel htmlFor="dischargeDateLabel">Discharge date</InputLabel>
      <Input
        id="dischargeDateLabel"
        type="date"
        placeholder="YYYY-MM-DD"
        fullWidth
        required
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Discharge criteria"
        fullWidth
        required
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
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

export default AddHospitalForm;
