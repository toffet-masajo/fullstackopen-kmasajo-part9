import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { EntryType, NewEntry } from "../../types";

interface Props {
  onClose: () => void;
  onSubmit: (newEntry: NewEntry) => Promise<void>;
}

const AddEntryForm = ({ onClose, onSubmit }: Props) => {
  const [newEntry, setNewEntry] = useState<NewEntry>({} as NewEntry);
  const [entryType, setEntryType] = useState<string>(EntryType.HealthCheck);

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
      <Typography align="left" variant="h6">
        New {entryType} Entry
      </Typography>
      <TextField
        label="Description"
        fullWidth
        value={newEntry.description ?? ""}
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, description: target.value })
        }
      />
      <TextField
        label="Date"
        fullWidth
        value={newEntry.date ?? ""}
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, date: target.value })
        }
      />
      <TextField
        label="Specialist"
        fullWidth
        value={newEntry.specialist ?? ""}
        onChange={({ target }) =>
          setNewEntry({ ...newEntry, specialist: target.value })
        }
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={newEntry.diagnosisCodes?.join(", ") ?? ""}
        onChange={({ target }) =>
          setNewEntry({
            ...newEntry,
            diagnosisCodes: target.value.split(",").map((item) => item.trim()),
          })
        }
      />
      {entryType === EntryType.HealthCheck && (
        <TextField
          label="Healthcheck Rating"
          fullWidth
          value={newEntry.healthCheckRating ?? ""}
          onChange={({ target }) =>
            setNewEntry({
              ...newEntry,
              healthCheckRating: Number(target.value),
            })
          }
        />
      )}
      {entryType === EntryType.Hospital && (
        <>
          <TextField
            label="Discharge date"
            fullWidth
            value={newEntry.discharge?.date ?? ""}
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                discharge: { ...newEntry.discharge, date: target.value },
              })
            }
          />
          <TextField
            label="Discharge criteria"
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
          <TextField
            label="Employer"
            fullWidth
            value={newEntry.employerName ?? ""}
            onChange={({ target }) =>
              setNewEntry({ ...newEntry, employerName: target.value })
            }
          />
          <TextField
            label="Sick leave start date"
            value={newEntry.sickLeave?.startDate ?? ""}
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                sickLeave: { ...newEntry.sickLeave, startDate: target.value },
              })
            }
          />
          <TextField
            label="Sick leave end date"
            value={newEntry.sickLeave?.endDate ?? ""}
            onChange={({ target }) =>
              setNewEntry({
                ...newEntry,
                sickLeave: { ...newEntry.sickLeave, endDate: target.value },
              })
            }
          />
        </>
      )}
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
