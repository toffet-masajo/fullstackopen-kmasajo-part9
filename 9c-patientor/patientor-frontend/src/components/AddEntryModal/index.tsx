import { Alert, Box } from "@mui/material";

import { NewEntry } from "../../types";

import AddEntryForm from "./AddEntryForm";

interface Props {
  error?: string;
  onClose: () => void;
  onSubmit: (newEntry: NewEntry) => Promise<void>;
}

const AddEntryModal = ({ onClose, onSubmit, error }: Props) => (
  <Box>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm onClose={onClose} onSubmit={onSubmit} />
  </Box>
);

export default AddEntryModal;
