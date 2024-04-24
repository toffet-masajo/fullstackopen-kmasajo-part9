import { Typography, Box } from "@mui/material";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import { useEffect, useState } from "react";

import PatientEntry from "./PatientEntry";
import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";

interface PatientProps {
  patientId: string;
}

interface GenderProps {
  gender: Gender;
}

const GenderSymbol = ({ gender }: GenderProps) => {
  if (gender === Gender.Male) return <Male fontSize="inherit" />;
  if (gender === Gender.Female) return <Female fontSize="inherit" />;
  if (gender === Gender.Other) return <QuestionMark fontSize="inherit" />;
};

const PatientPage = ({ patientId }: PatientProps) => {
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientData = async () => {
      const patient = await patientService.getPatient(patientId);
      setPatient(patient);
    };
    void fetchPatientData();
  }, [patientId]);

  return patient?.name ? (
    <div>
      <Box>
        <Typography align="left" variant="h5">
          {patient.name}
          <GenderSymbol gender={patient.gender} />
        </Typography>
      </Box>
      <Typography align="left" variant="body1">
        ssn: {patient.ssn}
      </Typography>
      <Typography align="left" variant="body1">
        occupation: {patient.occupation}
      </Typography>
      <Box>
        <Typography align="left" variant="h6">
          entries
        </Typography>
        {patient.entries?.map((entry, id) => (
          <PatientEntry key={id} entry={entry} />
        ))}
      </Box>
    </div>
  ) : (
    <div>
      <Typography variant="h5">
        Patient does not exist in the system!
      </Typography>
    </div>
  );
};

export default PatientPage;
