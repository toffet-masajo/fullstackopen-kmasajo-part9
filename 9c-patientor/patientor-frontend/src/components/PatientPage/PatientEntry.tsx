import { Box, List, ListItem, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalSharpIcon from "@mui/icons-material/LocalHospitalSharp";

import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import DiagnosisEntry from "./DiagnosisEntry";
import HealthRatingBar from "../HealthRatingBar";

type PatientEntryProps = {
  entry: Entry;
};

type HealthCheckEntryProps = {
  entry: HealthCheckEntry;
};

type HospitalEntryProps = {
  entry: HospitalEntry;
};

type OccupationalHealthcareEntryProps = {
  entry: OccupationalHealthcareEntry;
};

const HealthCheckData = ({ entry }: HealthCheckEntryProps) => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
      <Typography align="left" variant="body1">
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography align="left" variant="body1">
        {entry.description}
      </Typography>
      <Typography align="left" variant="body1">
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      </Typography>
      <Typography align="left" variant="body1">
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );
};

const HospitalData = ({ entry }: HospitalEntryProps) => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
      <Typography align="left" variant="body1">
        {entry.date} <LocalHospitalSharpIcon />
      </Typography>
      <Typography align="left" variant="body1">
        {entry.description}
      </Typography>
      <Typography align="left" variant="body1">
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );
};

const OccupationalHealthcareData = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px solid grey" }}>
      <Typography align="left" variant="body1">
        {entry.date} <WorkIcon />
      </Typography>
      <Typography align="left" variant="body1">
        {entry.description}
      </Typography>
      {entry.diagnosisCodes && (
        <List>
          {entry.diagnosisCodes.map((diagnosis) => (
            <ListItem key={diagnosis}>
              <DiagnosisEntry diagnosis={diagnosis} />
            </ListItem>
          ))}
        </List>
      )}
      <Typography align="left" variant="body1">
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );
};

const PatientEntry = ({ entry }: PatientEntryProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckData entry={entry} />;
    case "Hospital":
      return <HospitalData entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareData entry={entry} />;
    default:
      return null;
  }
};

export default PatientEntry;
