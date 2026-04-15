import type { NewPatientEntry } from './types.ts';
import { Gender } from './types.ts';

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseField(object.name, 'name'),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseField(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation, 'occupation')
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseField = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }
  return field;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

export default parseNewPatientEntry;
