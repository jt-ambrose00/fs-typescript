import { v4 as uuidv4 } from "uuid";

import patients from '../../data/patients.ts';
import type {
  Patient,
  Entry,
  NonSensitivePatient,
  NewPatientEntry,
  NewEntry
} from '../types.ts';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  const patients = getPatients();
  const patient = patients.find(patient => patient.id === id);
  if (!patient) { throw new Error('Patient not found'); };
  return patient;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const patient = getPatientById(id);

  const newEntry: Entry = {
    id: uuidv4(),
    ...entry
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitiveEntries,
  addPatient,
  addEntry
};
