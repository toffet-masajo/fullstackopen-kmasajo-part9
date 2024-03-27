const calculateBmi = (height: number, mass: number): string => {
  if (height <= 0 || mass <= 0) throw new Error("Invalid input detected");

  const bmi = Math.round((mass / (height / 100) ** 2) * 100) / 100;

  if (16.0 > bmi) return "Underweight (Severe thinness)";
  if (16.0 <= bmi && 16.99 >= bmi) return "Underweight (Moderate thinness)";
  if (17.0 <= bmi && 18.49 >= bmi) return "Underweight (Mild thinness)";
  if (18.5 <= bmi && 24.99 >= bmi) return "Normal (Healthy weight)";
  if (25.0 <= bmi && 29.99 >= bmi) return "Overweight (Pre-obese)";
  if (30.0 <= bmi && 34.99 >= bmi) return "Obese (Class I)";
  if (35.0 <= bmi && 39.99 >= bmi) return "Obese (Class II)";
  if (40.0 <= bmi) return "Obese (Class III)";
};

console.log(calculateBmi(180, 50));
console.log(calculateBmi(180, 53));
console.log(calculateBmi(180, 55));
console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 95));
console.log(calculateBmi(180, 110));
console.log(calculateBmi(180, 115));
console.log(calculateBmi(180, 130));
