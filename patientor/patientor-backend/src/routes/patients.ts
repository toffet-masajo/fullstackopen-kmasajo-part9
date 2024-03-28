import express from "express";
import { addPatient, getPatientsPublic } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatientsPublic());
});

router.post("/", (req, res) => {
  const newPatient = addPatient(req.body);
  console.log(newPatient);
  res.send("Adding patient");
});

export default router;
