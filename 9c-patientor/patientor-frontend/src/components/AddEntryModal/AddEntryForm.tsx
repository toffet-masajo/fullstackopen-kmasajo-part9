import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import diagnosisService from "../../services/diagnoses";
import { EntryType, NewEntry } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (newEntry: NewEntry) => Promise<void>;
}

const AddEntryForm = ({ onClose, onSubmit }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>({} as NewEntry);
  const [entryType, setEntryType] = useState<string>(EntryType.HealthCheck);
  const [diagnoses, setDiagnoses] = useState<string[]>([]);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      const data = await diagnosisService.getDiagnoses();
      setDiagnoses(data.map((item) => item.code.concat(" - ", item.name)));
    };

    void fetchDiagnosisData();
  }, []);

  return (
    <div>
      <Autocomplete
        disablePortal
        onChange={(event: any, newValue: string) => {
          setEntryType(newValue);
        }}
        options={Object.values(EntryType).filter((value) =>
          isNaN(Number(value))
        )}
        renderInput={(params) => <TextField {...params} label="Entry type" />}
        value={entryType}
      />
      <Typography align="left" style={{ marginTop: 30 }} variant="h6">
        New {entryType} Entry
      </Typography>
      <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
      <TextField
        fullWidth
        value={newEntry.description ?? ""}
        variant="standard"
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, description: target.value })
        }
      />
      <InputLabel style={{ marginTop: 20 }}>Entry date</InputLabel>
      <Input
        fullWidth
        value={newEntry.date ?? ""}
        type="date"
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, date: target.value })
        }
      />
      <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
      <TextField
        fullWidth
        value={newEntry.specialist ?? ""}
        variant="standard"
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, specialist: target.value })
        }
      />
      <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
      <Select
        fullWidth
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected?.map((value) => {
              const code = value.split(" - ")[0];
              return <Chip key={code} label={code} />;
            })}
          </Box>
        )}
        value={newEntry.diagnosisCodes ?? []}
        onChange={(
          event: SelectChangeEvent<typeof newEntry.diagnosisCodes>
        ) => {
          const {
            target: { value },
          } = event;
          const newCodes = value.map((item) => item.split(" - ")[0]);
          setNewEntry({
            ...newEntry,
            diagnosisCodes:
              typeof newCodes === "string"
                ? newCodes.split(",").map((item) => item.trim())
                : newCodes,
          });
        }}
      >
        {diagnoses.map((item) => {
          const code = item.split(" - ")[0];
          return (
            <MenuItem key={code} value={item}>
              <Checkbox checked={newEntry.diagnosisCodes?.indexOf(code) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          );
        })}
      </Select>
      {entryType === EntryType.HealthCheck && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Healthcheck Rating</InputLabel>
          <TextField
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 4 } }}
            value={newEntry.healthCheckRating ?? ""}
            variant="standard"
            type="number"
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                healthCheckRating: Number(target.value),
              })
            }
          />
        </>
      )}
      {entryType === EntryType.Hospital && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
          <Input
            fullWidth
            value={newEntry.discharge?.date ?? ""}
            type="date"
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                discharge: { ...newEntry.discharge, date: target.value },
              })
            }
          />
          <InputLabel style={{ marginTop: 20 }}>Discharge criteria</InputLabel>
          <TextField
            fullWidth
            value={newEntry.discharge?.criteria ?? ""}
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                discharge: { ...newEntry.discharge, criteria: target.value },
              })
            }
          />
        </>
      )}
      {entryType === EntryType.OccupationalHealthcare && (
        <>
          <InputLabel style={{ marginTop: 20 }}>Employer</InputLabel>
          <TextField
            fullWidth
            value={newEntry.employerName ?? ""}
            onChange={({ target }) =>
              setNewEntry({ ...newEntry, employerName: target.value })
            }
          />
          <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel style={{ marginTop: 20 }}>start date</InputLabel>
              <Input
                fullWidth
                value={newEntry.sickLeave?.startDate ?? ""}
                type="date"
                onChange={({ target }) =>
                  setNewEntry({
                    ...newEntry,
                    sickLeave: {
                      ...newEntry.sickLeave,
                      startDate: target.value,
                    },
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel style={{ marginTop: 20 }}>end date</InputLabel>
              <Input
                fullWidth
                value={newEntry.sickLeave?.endDate ?? ""}
                type="date"
                onChange={({ target }) =>
                  setNewEntry({
                    ...newEntry,
                    sickLeave: { ...newEntry.sickLeave, endDate: target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </>
      )}
      <InputLabel style={{ marginTop: 20 }} />
      <Grid>
        <Grid item>
          <Button
            color="secondary"
            onClick={onClose}
            style={{ float: "left" }}
            type="button"
            variant="contained"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={entryType === null}
            onClick={() => onSubmit(newEntry)}
            style={{ float: "right" }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddEntryForm;
