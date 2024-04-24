import express from "express";

import { getDiagnoses, getDiagnosis } from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getDiagnoses());
});

router.get("/:code", (req, res) => {
  res.send(getDiagnosis(req.params.code));
});

router.post("/", (_req, res) => {
  res.send("Saving diagnoses");
});

export default router;
