import {
  Diagnosis,
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const isNum = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isEmpty = (text: string): boolean => {
  return text === "";
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

const isValidRating = (num: number): boolean => {
  return num >= 0 && num <= 3;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria) || isEmpty(criteria))
    throw new Error("Invalid criteria format");
  return criteria;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error("Incorrect date format");
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || isEmpty(description))
    throw new Error("Invalid description format");
  return description;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object") {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object as Array<Diagnosis["code"]>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if ("date" in object && "criteria" in object) {
    return {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
  }
  throw new Error("Incorrect discharge: some fields are missing");
};

const parseEmployer = (employer: unknown): string => {
  if (!isString(employer) || isEmpty(employer))
    throw new Error("Incorrect employer format");
  return employer;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrect gender type");
  return gender;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNum(rating) || !isValidRating(rating))
    throw new Error("Incorrect health check rating type");
  return rating;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || isEmpty(name))
    throw new Error("Incorrect name format");
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || isEmpty(occupation))
    throw new Error("Incorrect occupation format");
  return occupation;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if ("startDate" in object && "endDate" in object)
    return {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
  throw new Error("Incorrect sickLeave: some fields are missing");
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) throw new Error("Incorrect SSN format");
  return ssn;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    if ("healthCheckRating" in object)
      return {
        type: "HealthCheck",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    else if ("discharge" in object)
      return {
        type: "Hospital",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
      };
    else if ("employerName" in object)
      return {
        type: "OccupationalHealthcare",
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployer(object.employerName),
        sickLeave:
          "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
      };
    else throw new Error("Incorrect patient entry: unrecognized entry type");
  }
  throw new Error("Incorrect patient entry: some fields are missing");
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: object.entries as Array<Entry>,
    };
    return newPatient;
  }
  throw new Error("Incorrect patient data: some fields are missing");
};
