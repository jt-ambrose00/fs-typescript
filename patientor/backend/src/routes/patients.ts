/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { type Response } from 'express';

import patientService from '../services/patientService.ts';

import type { NonSensitivePatientEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientService.addPatient({    
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });  
  res.json(addedEntry);
});

export default router;

// Set up safe parsing, validation and type predicate to the POST /api/patients request.

// Refactor the gender field to use a const object based type.
