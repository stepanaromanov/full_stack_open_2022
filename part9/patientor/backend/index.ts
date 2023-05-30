import express from 'express';
const cors = require('cors');
import patientsRouter from './routes/patientsRouter';
import diagnosesRouter from './routes/diagnosesRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong!');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});