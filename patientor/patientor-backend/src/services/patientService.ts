import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { NewPatient, NoPatientSSN, Patient } from "../types";

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

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};
