import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { convertToNumber } from './utils.ts';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
