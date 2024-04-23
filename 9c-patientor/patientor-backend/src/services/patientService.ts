import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  PatientData,
} from "../types";

export const getPatient = (patientId: string): PatientData =>
  patients.find((patient) => patient.id === patientId);

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientsPublic = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};
