import { List, ListItem, Typography } from "@mui/material";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import DiagnosisEntry from "./DiagnosisEntry";

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
    <div>
      <Typography align="left" variant="body1">
        {entry.date} {entry.description}
      </Typography>
    </div>
  );
};

const HospitalData = ({ entry }: HospitalEntryProps) => {
  return (
    <div>
      <Typography align="left" variant="body1">
        {entry.date} {entry.description}
      </Typography>
    </div>
  );
};

const OccupationalHealthcareData = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <Typography align="left" variant="body1">
        {entry.date} {entry.description}
      </Typography>
      <List>
        {entry.diagnosisCodes?.map((diagnosis) => (
          <ListItem key={diagnosis}>
            <DiagnosisEntry diagnosis={diagnosis} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const PatientEntry = ({ entry }: PatientEntryProps) => {
  if (entry.type === "HealthCheck") return <HealthCheckData entry={entry} />;
  if (entry.type === "Hospital") return <HospitalData entry={entry} />;
  if (entry.type === "OccupationalHealthcare")
    return <OccupationalHealthcareData entry={entry} />;
  return <div></div>;
};

export default PatientEntry;
