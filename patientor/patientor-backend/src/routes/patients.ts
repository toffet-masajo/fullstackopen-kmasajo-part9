import express from "express";
import { getPatientsPublic } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(getPatientsPublic());
});

router.post("/", (_req, res) => {
  return res.send("Adding patient");
});

export default router;
