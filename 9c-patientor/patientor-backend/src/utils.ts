import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(gender);
};

const isSSN = (ssn: string): boolean => {
  return Boolean(ssn.match("^\\d{6}-[A-Za-z0-9]{3,4}$"));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error("Incorrect date format");
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrect gender type");
  return gender;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error("Incorrect name format");
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error("Incorrect occupation format");
  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) throw new Error("Incorrect SSN format");
  return ssn;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};
