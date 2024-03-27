const RATING_DESCRIPTION = ["Below target", "Target met", "Above target"];

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: Array<number>,
  targetHours: number
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour > 0);
  const average =
    trainingDays.reduce((acc, day) => acc + day, 0) / periodLength;
  const success = average === targetHours;
  const rating = success ? 1 : average < targetHours ? 0 : 2;

  return {
    periodLength,
    trainingDays: trainingDays.length,
    success,
    rating: rating + 1,
    ratingDescription: RATING_DESCRIPTION[rating],
    target: targetHours,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0.5, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 2, 3, 1], 2));
