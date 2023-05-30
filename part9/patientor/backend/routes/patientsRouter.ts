import express from 'express';
import {  
          PatientEntry,
        } from '../src/types';
import { 
          createNewEntry,
          createNewPatient
        } from '../utils';
import patientsData from '../data/patients';

const patientsRouter = express.Router();

const patients: PatientEntry[] = patientsData as PatientEntry[];

patientsRouter.get('/', (_req, res) => {
  res.send(patients);
});

patientsRouter.get('/:id', async (_req, res) => {
  const patient = patients.filter(p => p.id === _req.params.id)
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).end()
  }
});

patientsRouter.post('/', (_req, res) => {
  const newPatient = createNewPatient(_req.body)
  if (newPatient) {
      res.send(newPatient);
  } else { 
    throw new Error('Incorrect data: some fields are missing');
  }
});

patientsRouter.post('/:id/entries', (_req, res) => {
  const newEntry = createNewEntry(_req.body)
  console.log(newEntry)
  if (newEntry) {
      res.send(newEntry);
  } else { 
    throw new Error('Incorrect new entry: some fields are missing');
  }
});

export default patientsRouter;