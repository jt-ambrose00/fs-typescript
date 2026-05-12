import { Box, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { HospitalEntry, Diagnosis } from '../../types';

interface Props {
  entry: HospitalEntry;
  diagnoses?: Diagnosis[];
}

const HospitalDetails = ({ entry, diagnoses }: Props) => {
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses?.find(diagnosis => diagnosis.code === code);
    return diagnosis?.name;
  };

  return (
    <Card variant='outlined' sx={{ mb: 2}}>
      <CardContent>
        <Box
          component='span'
          display='flex'
          justifyContent='space-between'
          fontWeight='bold'
        >
          {entry.date}
          <LocalHospitalIcon />
        </Box>
        <Typography>
          {entry.description}
        </Typography>
        <Typography my={1}>
          diagnosis by: {entry.specialist}
        </Typography>
        <List sx={{ listStyleType: 'disc', pl: 2 }}>
          {entry.diagnosisCodes?.map((code: string) => (
            <ListItem key={code} sx={{ display: 'list-item', py: 0 }}>
              <ListItemText>
                {code} {getDiagnosisName(code)}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Typography>
          discharged: {entry.discharge.date} {entry.discharge.criteria}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalDetails;
