import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Alert, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

import { HealthCheckEntryFormValues, HealthCheckRating } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

const AddHealthCheckEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(','),
      healthCheckRating
    });
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
    setHealthCheckRating(HealthCheckRating.Healthy);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
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
            label="Health Check Rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddHealthCheckEntry;
