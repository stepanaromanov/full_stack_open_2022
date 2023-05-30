import {  Dialog, 
          DialogTitle, 
          DialogContent, 
          Divider, 
          Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { EntryWithoutId, DiagnosisEntry } from "../../types";

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  selectedType: string;
  error?: string;
  diagnoses: DiagnosisEntry[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, selectedType, error, diagnoses }: EntryProps) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} 
                    onCancel={onClose} 
                    selectedType={selectedType}                 
                    diagnoses={diagnoses}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;