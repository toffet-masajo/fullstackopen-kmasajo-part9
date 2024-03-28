import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export const addDiagnosis = () => {
  return null;
};
