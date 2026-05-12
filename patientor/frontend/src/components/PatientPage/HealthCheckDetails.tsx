import { Box, Typography, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import { HealthCheckEntry, Diagnosis } from '../../types';

interface Props {
  entry: HealthCheckEntry;
  diagnoses?: Diagnosis[];
}

const HealthRatingIcon = ((rating: number) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case 1:
      return <FavoriteIcon sx={{ color: 'yellow' }} />;
    case 2:
      return <FavoriteIcon sx={{ color: 'orange' }} />;
    case 3:
      return <FavoriteIcon sx={{ color: 'red' }} />;
    default:
      return <FavoriteIcon />;
  }
});

const HealthCheckDetails = ({ entry, diagnoses }: Props) => {
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
          <MedicalInformationIcon />
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
        {HealthRatingIcon(entry.healthCheckRating)}
      </CardContent>
    </Card>
  );
};

export default HealthCheckDetails;
