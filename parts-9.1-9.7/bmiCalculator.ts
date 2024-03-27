import { isNotNumber } from "./utils/utils";

const USAGE_BMI = `
USAGE: calculateBmi height weight

  where:
    height: number, in cm
    weight: number, in kg
  
  sample:
    calculateBmi 180 74
`;

const calculateBmi = (height: number, mass: number): string => {
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

if (process.argv.length < 4) console.log(`Not enough parameters! ${USAGE_BMI}`);
else if (process.argv.length > 4)
  console.log(`Too many arguments! ${USAGE_BMI}`);
else if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3]))
  console.log(`Invalid parameter types! ${USAGE_BMI}`);
else
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
