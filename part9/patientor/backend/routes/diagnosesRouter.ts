import express from 'express';
import diagnosesData from '../data/diagnoses';
import { DiagnosisEntry } from '../src/types';

const diagnosesRouter = express.Router();

const diagnoses: DiagnosisEntry[] = diagnosesData;

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnoses);
});

export default diagnosesRouter;



