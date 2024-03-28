import express from "express";

import { addPatient, getPatientsPublic } from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatientsPublic());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const newEntry = addPatient(newPatient);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Error occurred.";
    if (error instanceof Error) errorMessage += error.message;
    res.status(404).send(errorMessage);
  }
});

export default router;
