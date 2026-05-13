import express, {
  type Response,
  type Request,
  type NextFunction
} from 'express';
import { z } from 'zod';

import patientService from '../services/patientService.ts';

import { 
  NewPatientSchema,
  NewEntrySchema,
  type NewPatientEntry,
  type NewEntry,
  type NonSensitivePatient,
  type Patient,
  type Entry
} from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);
  res.send(patient);
});

const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (
  req: Request<unknown, unknown, NewPatientEntry>,
  res: Response<Patient>
) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (
  req: Request<{ id: string}, unknown, NewEntry>,
  res: Response<Entry>
) => {
  const addedEntry = patientService.addEntry(req.body, req.params.id);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
