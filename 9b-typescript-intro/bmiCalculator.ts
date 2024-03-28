import { isNotNumber } from "./utils/utils";

const USAGE_BMI = `
USAGE: calculateBmi height weight

  where:
    height: number, in cm
    weight: number, in kg
  
  sample:
    calculateBmi 180 74
`;

export const calculateBmi = (heightParam: any, massParam: any): string => {
  if (isNotNumber(heightParam) || isNotNumber(massParam))
    throw new Error("Invalid parameter types");

  const height = Number(heightParam);
  const mass = Number(massParam);
  if (height <= 0 || mass <= 0) throw new Error("Invalid input detected");

  const bmi = Math.round((mass / (height / 100) ** 2) * 100) / 100;

  if (16.0 > bmi) return "Underweight (Severe thinness)";
  if (16.99 >= bmi) return "Underweight (Moderate thinness)";
  if (18.49 >= bmi) return "Underweight (Mild thinness)";
  if (24.99 >= bmi) return "Normal (Healthy weight)";
  if (29.99 >= bmi) return "Overweight (Pre-obese)";
  if (34.99 >= bmi) return "Obese (Class I)";
  if (39.99 >= bmi) return "Obese (Class II)";
  return "Obese (Class III)";
};

try {
  if (process.argv.length < 4)
    console.log(`Not enough parameters! ${USAGE_BMI}`);
  else if (process.argv.length > 4)
    console.log(`Too many arguments! ${USAGE_BMI}`);
  else console.log(calculateBmi(process.argv[2], process.argv[3]));
} catch (error: unknown) {
  let errorMessage = "An error occured: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}
