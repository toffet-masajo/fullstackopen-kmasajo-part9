import { isNotNumber } from "./utils/utils";

const RATING_DESCRIPTION = ["Below target", "Target met", "Above target"];
const USAGE_EXERCISE = `
USAGE: calculateExercises targetHours exerciseHours

  where:
    targetHours: target number of hours
    exerciseHours: list hours spent per day exercising

  sample:
    calculateExercises 2 3 0 2 4.5 0 3 1
`;

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

const [, , target, ...hours] = process.argv;
if (isNotNumber(target))
  console.log(`Invalid targetHours type! ${USAGE_EXERCISE}`);
else if (hours.filter((hour) => isNotNumber(hour)).length > 0)
  console.log(`Invalid exerciseHours type! ${USAGE_EXERCISE}`);
else
  console.log(
    calculateExercises(
      hours.map((hour) => Number(hour)),
      Number(target)
    )
  );
