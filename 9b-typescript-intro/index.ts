import bodyParser from "body-parser";
import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils/utils";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (error: unknown) {
    res.json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    if (!target || !daily_exercises) throw new Error("parameters missing");
    else if (
      isNotNumber(target) ||
      daily_exercises.filter((hour: string) => isNotNumber(hour)).length > 0
    )
      throw new Error("malformatted parameters");
    else
      res.send(
        calculateExercises(
          daily_exercises.map((hour: string) => Number(hour)),
          Number(target)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    res.status(400).send({ error: (error as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
