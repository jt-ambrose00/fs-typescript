import { convertToNumber } from "./utils.ts";

interface Results {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface ExerciseArguments {
  target: number;
  dailyHours : number[];
}

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = convertToNumber(args[2]);

  const dailyHours = args.slice(3).map(arg => convertToNumber(arg));

  return {
    target: target,
    dailyHours: dailyHours
  };
};

export const calculateExercises = (target: number, dailyHours: number[]): Results => {
  const periodLength: number = dailyHours.length;

  const trainingDays: number = dailyHours.filter(hours => hours > 0).length;

  const totalHours: number = dailyHours.reduce((sum, hours) => sum + hours, 0);

  const average: number = totalHours / periodLength;

  const success: boolean = average < target ? false : true;

  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = 'You exceeded your goal.';
  } else if (average >= target) {
    rating = 2;
    ratingDescription = 'You met your goal.';
  } else {
    rating = 1;
    ratingDescription = 'You did not meet your goal.';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, dailyHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
