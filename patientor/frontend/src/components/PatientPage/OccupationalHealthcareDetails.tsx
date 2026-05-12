import { Box, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import PersonalInjuryIcon from '@mui/icons-material/PersonalInjury';

import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses?: Diagnosis[];
}

const OccupationalHealthcareDetails = ({ entry, diagnoses }: Props) => {
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
          <PersonalInjuryIcon />
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
          employer: {entry.employerName}
        </Typography>
        <Typography>
          sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcareDetails;
