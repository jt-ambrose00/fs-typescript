import { Entry, Diagnosis } from "../../types";
import HealthCheckDetails from "./HealthCheckDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";
import HospitalDetails from "./HospitalDetails";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface Props {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails
        entry={entry}
        diagnoses={diagnoses}
      />;
    case 'Hospital':
      return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
