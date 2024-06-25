import { Female, Male, QuestionMark } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import AddEntryModal from "../AddEntryModal";
import PatientEntry from "./PatientEntry";
import { Entry, Gender, NewEntry, Patient } from "../../types";
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
  const [error, setError] = useState<string>();
  const [showAddEntry, setShowAddEntry] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatientData = async () => {
      const patient = await patientService.getPatient(patientId);
      setPatient(patient);
    };
    void fetchPatientData();
  }, [patientId]);

  const closeModal = () => {
    setError(undefined);
    setShowAddEntry(false);
  };

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      console.log(entry);
      const newEntry = (await patientService.addEntry(
        patientId,
        entry
      )) as Entry;
      patient?.entries?.push(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return patient?.name ? (
    <div>
      <div>
        <Typography align="left" variant="h5">
          {patient.name}
          <GenderSymbol gender={patient.gender} />
        </Typography>
        <Typography align="left" variant="body1">
          ssn: {patient.ssn}
        </Typography>
        <Typography align="left" variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </div>
      <div>
        {!showAddEntry && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => setShowAddEntry(true)}
          >
            Add entry
          </Button>
        )}
        {showAddEntry && (
          <>
            <br />
            <AddEntryModal
              error={error}
              onClose={closeModal}
              onSubmit={submitNewEntry}
            />
            <br />
            <br />
            <br />
          </>
        )}
      </div>
      <div>
        <Typography align="left" variant="h6">
          entries
        </Typography>
        {patient.entries?.map((entry, id) => (
          <PatientEntry key={id} entry={entry} />
        ))}
      </div>
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
