import patientsData from "../../data/patients";
import { NoPatientSSN, Patient } from "../types";

const patients: Patient[] = patientsData;

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientsPublic = (): NoPatientSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = () => {
  return null;
};
