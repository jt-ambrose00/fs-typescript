import { convertToNumber } from "./utils.ts";

interface Measurements {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): Measurements => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = convertToNumber(args[2]);
  const weight = convertToNumber(args[3]);

  return {
    height: height,
    weight: weight
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight range'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight range'
  } else {
    return 'Obese range'
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
