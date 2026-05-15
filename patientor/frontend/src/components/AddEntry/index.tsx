import { useState } from "react";
import { Alert, Dialog, DialogTitle, DialogContent, Divider, Select, SelectChangeEvent, MenuItem, InputLabel } from '@mui/material';

import { EntryFormValues } from "../../types";
import AddHealthCheckForm from "./AddHealthCheckForm";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalHealthcareForm from "./AddOccupationalHealthcareForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [type, setType] = useState<string>('');

  const changeEntryType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <InputLabel>Entry type</InputLabel>
        <Select
          label='Entry type'
          fullWidth
          value={type}
          onChange={changeEntryType}
        >
          <MenuItem key='HealthCheck' value='HealthCheck'>
            Health Check
          </MenuItem>
          <MenuItem key='Hospital' value='Hospital'>
            Hospital
          </MenuItem>
          <MenuItem key='OccupationalHealthcare' value='OccupationalHealthcare'>
            Occupational Healthcare
          </MenuItem>
        </Select>
        {type === 'HealthCheck' && (
          <AddHealthCheckForm onClose={onClose} onSubmit={onSubmit} />
        )}
        {type === 'Hospital' && (
          <AddHospitalForm onClose={onClose} onSubmit={onSubmit} />
        )}
        {type === 'OccupationalHealthcare' && (
          <AddOccupationalHealthcareForm onClose={onClose} onSubmit={onSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntry;
