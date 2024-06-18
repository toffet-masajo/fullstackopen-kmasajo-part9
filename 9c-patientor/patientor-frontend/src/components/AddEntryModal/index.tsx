import { Alert, Box } from "@mui/material";

import AddEntryForm from "./AddEntryForm";

interface Props {
  error?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const AddEntryModal = ({ onClose, onSubmit, error }: Props) => (
  <Box>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm onClose={onClose} onSubmit={onSubmit} />
  </Box>
);

export default AddEntryModal;
