interface Results {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (dailyHours: number[], target: number): Results => {
  const periodLength: number = dailyHours.length;

  const trainingDays: number = dailyHours.filter(hours => hours > 0).length;

  const totalHours: number = dailyHours.reduce((sum, hours) => sum + hours, 0);

  const average: number = totalHours / periodLength;

  const success: boolean = average < target ? false : true;

  let rating: number;
  let ratingDescription;

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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
