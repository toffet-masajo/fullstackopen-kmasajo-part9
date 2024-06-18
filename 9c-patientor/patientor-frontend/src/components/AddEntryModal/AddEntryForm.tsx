import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onClose: () => void;
  onSubmit: (
    description: string,
    date: string,
    specialist: string,
    rating: string,
    diagnosis: string
  ) => void;
}

const AddEntryForm = ({ onClose, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [rating, setRating] = useState("");
  const [specialist, setSpecialist] = useState("");

  return (
    <div>
      <Typography align="left" variant="h6">
        New HealthCheck Entry
      </Typography>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="Healthcheck Rating"
        fullWidth
        value={rating}
        onChange={({ target }) => setRating(target.value)}
      />
      <TextField
        label="Diagnosis codes"
        fullWidth
        value={diagnosis}
        onChange={({ target }) => setDiagnosis(target.value)}
      />
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
            onClick={() =>
              onSubmit(description, date, specialist, rating, diagnosis)
            }
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
