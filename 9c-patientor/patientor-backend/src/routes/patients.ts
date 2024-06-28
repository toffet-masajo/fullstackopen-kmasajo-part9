import express from "express";

import {
  addEntry,
  addPatient,
  getPatient,
  getPatientsPublic,
} from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = getPatient(id);
  res.json(patient || { error: "patient not found" });
});

router.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const entry = toNewEntry(req.body);
    const newEntry = addEntry(id, entry);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = "Error occurred.";
    if (error instanceof Error) errorMessage += error.message;
    res.status(404).send(errorMessage);
  }
});

export default router;
