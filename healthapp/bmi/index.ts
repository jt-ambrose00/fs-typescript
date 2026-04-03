import express from 'express';

const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { convertToNumber } from './utils.ts';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (
    !height ||
    !weight ||
    typeof height !== 'string' ||
    typeof weight !== 'string'
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    const convertedHeight = convertToNumber(height);
    const convertedWeight = convertToNumber(weight);

    const bmi = calculateBmi(convertedHeight, convertedWeight);

    res.send({
      height: convertedHeight,
      weight: convertedWeight,
      bmi: bmi
    });
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const converted_target = convertToNumber(target);
    const converted_daily_exercises = daily_exercises.map(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      day => convertToNumber(day)
    );

    const results = calculateExercises(
      converted_target,
      converted_daily_exercises
    );

    res.send(results);
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
