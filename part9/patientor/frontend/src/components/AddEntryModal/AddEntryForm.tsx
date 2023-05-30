import {  useState, 
          SyntheticEvent 
        } from "react";
import {  TextField, 
          Grid,
          Button,
          InputLabel,
          Select,
          MenuItem,
          SelectChangeEvent,
          FormControl,
          OutlinedInput
        } from '@mui/material';
import {  EntryWithoutId, 
          EntryType,
          HealthCheckRating,
          Discharge,
          SickLeave,
          DiagnosisEntry
        } from "../../types";
import {  Theme, 
          useTheme 
        } from '@mui/material/styles';


interface EntryProps {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  selectedType: string;
  diagnoses: DiagnosisEntry[];
}

const AddEntryForm = ({ onCancel, onSubmit, selectedType, diagnoses }: EntryProps) : JSX.Element => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [dischargeDate, setDichargeDate] = useState('');
  const [dischargeCriteria, setDichargeCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')
  const [diagCodes, setDiagCodes] = useState<string[]>([]);
  
  const diagCodesAll = diagnoses.map(d => d.code)

  //styling of select menu
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (diag: string, diagCodes: string[], theme: Theme) => {
    return {
      fontWeight:
      diagCodes.indexOf(diag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const theme = useTheme();

  const handleDiag = (event: SelectChangeEvent<typeof diagCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  //add entry function
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const hcr = healthCheckRating === 0 ? HealthCheckRating.Healthy :
                healthCheckRating === 1 ? HealthCheckRating.LowRisk :
                healthCheckRating === 2 ? HealthCheckRating.HighRisk :
                HealthCheckRating.CriticalRisk;
    let entryObj : EntryWithoutId
    if (selectedType === EntryType.HealthCheckEntry) {
        entryObj = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagCodes as Array<DiagnosisEntry['code']>,
          type: EntryType.HealthCheckEntry,
          healthCheckRating: hcr,
        }
    } else if (selectedType === EntryType.HospitalEntry) {
        const newDischarge : Discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
        entryObj = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagCodes as Array<DiagnosisEntry['code']>,
          type: EntryType.HospitalEntry,
          discharge: newDischarge,
        }
    } else if (selectedType === EntryType.OccupationalHealthcareEntry) {
        const newSickLeave: SickLeave  = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd
        }
        entryObj = {
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagCodes as Array<DiagnosisEntry['code']>,
          type: EntryType.OccupationalHealthcareEntry,
          employerName: employerName,
          sickLeave: newSickLeave,
        }
    } else {
        throw new Error(`Incorrect or missing selected type: ${selectedType}`);
    }
    onSubmit(entryObj)
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          placeholder="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField style={{ marginTop: 7 }}
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField style={{ marginTop: 7 }}
          label="Specialist"
          placeholder="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel style={{ marginTop: 7 }} id="diag">Choose diagnosis code</InputLabel>
            <Select
              id="diag"
              multiple
              value={diagCodes}
              onChange={handleDiag}
              input={<OutlinedInput label="Code" />}
              MenuProps={MenuProps}
            >
                {diagCodesAll?.map((diag) => (
                  <MenuItem
                    key={diag}
                    value={diag}
                    style={getStyles(diag, diagCodes, theme)}
                  >
                    {diag}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        {selectedType === EntryType.HealthCheckEntry &&
        <TextField style={{ marginTop: 7 }}
          label="Health check rating"
          placeholder="Health check rating"
          fullWidth
          type="number"
          InputProps={{ inputProps: { min: 0, max: 3 } }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(parseInt(target.value))}
        />}
        {selectedType === EntryType.HospitalEntry &&
        <TextField style={{ marginTop: 7 }}
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dischargeDate}
          type="date"
          onChange={({ target }) => setDichargeDate(target.value)}
        />}
        {selectedType === EntryType.HospitalEntry &&
        <TextField style={{ marginTop: 7 }}
          label="Discharge criteria"
          placeholder="Discharge criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDichargeCriteria(target.value)}
        />}
        {selectedType === EntryType.OccupationalHealthcareEntry &&
        <TextField style={{ marginTop: 7 }}
          label="Employer name"
          placeholder="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />}
        {selectedType === EntryType.OccupationalHealthcareEntry &&
        <TextField style={{ marginTop: 7 }}
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveStart}
          type="date"
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />}
        {selectedType === EntryType.OccupationalHealthcareEntry &&
        <TextField style={{ marginTop: 7 }}
          placeholder="YYYY-MM-DD"
          fullWidth
          value={sickLeaveEnd}
          type="date"
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        />}  
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

