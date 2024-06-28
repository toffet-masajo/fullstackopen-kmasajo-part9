import diagnosesData from "../../data/diagnoses";
import { Diagnosis, DiagnosisApiValue } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export const getDiagnosis = (code: string): DiagnosisApiValue => {
  return diagnoses.find((diagnosis) => diagnosis.code === code);
};

export const addDiagnosis = () => {
  return null;
};
