import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  NewEntry,
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

export const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patients.map((patient) => {
    if (patient.id === patientId) {
      const newEntries = patient.entries;
      newEntries.push(newEntry);
      return { ...patient, entries: newEntries };
    }
    return patient;
  });

  return newEntry;
};
