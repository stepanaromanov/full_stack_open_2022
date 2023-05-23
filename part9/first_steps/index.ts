import express from 'express'
import _ from 'lodash'
import { calculateBMI } from './calculateBMI'
import { calculateExercises } from './exerciseCalculator'

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const { height, weight } = _req.query;
    if (isNaN(Number(height)) && isNaN(Number(weight)) || !height || !weight) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    const bmi = calculateBMI(Number(height), Number(weight));
    res.send({ height, weight, bmi });
});

app.post('/exercises', (_req, res) => {
    const { daily_exercises, target } = _req.body
    const values = daily_exercises.map((elem: any) => Number(elem))

    if (!values || !target) {
        res.status(400).send({ error: "parameters missing" });
    }
    if (values.includes(NaN) && isNaN(Number(target))) {
        res.status(400).send({ error: "malformatted missing" });
    }
    const result = calculateExercises(target, values)
    res.send(result)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
