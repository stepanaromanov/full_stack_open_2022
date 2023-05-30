import { useParams } from "react-router-dom";
import { useState } from "react";
import { PatientEntry, 
         DiagnosisEntry,
         EntryType,
         EntryWithoutId,
         EntryOptions,
         Entry
        }  from '../types'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, 
         Select, 
         MenuItem,
         InputLabel, 
         SelectChangeEvent } from '@mui/material';
import AddEntryModal from "./AddEntryModal";
import entryService from "../services/entries";
import axios from "axios";

interface Props {
    patients : PatientEntry[]
    diagnoses: DiagnosisEntry[]
    setPatients: React.Dispatch<React.SetStateAction<PatientEntry[]>>
}

const entOptions: EntryOptions[] = Object.values(EntryType).map(v => ({
    value: v, label: v.toString()
}))

const PatientInfo = ( { patients, diagnoses, setPatients } : Props ) => {
    const { id } = useParams()
    const patient = patients.find(p => p.id === id)

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [selectedType, setSelectedType] = useState<string>('HealthCheck');
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    if (!patient) {
        return null
    }

    const healthCheckColor = (value : number): string => {
        switch (value) {
            case 0:
                return 'green'
            case 1:
                return 'yellow'
            case 2:
                return 'orange'
            case 3:
                return 'red'
            default:
                return ''
        }
    }

    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const type = Object.values(EntryType).find(t => t.toString() === value);
          if (type) {
            setSelectedType(type);
          }
        }
    };

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            const entry = await entryService.create(values) as Entry ;
            patient.entries.push(entry);
            const updatedPatients = patients.map(p => p.id === patient.id ? patient : p);
            setPatients(updatedPatients);
            setModalOpen(false);
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
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

    return (
        <div>
            <h2>{patient.name}</h2>
            {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <TransgenderIcon /> }
            <br />
            <span>ssn: </span>{patient.ssn? patient.ssn : null}
            <br />
            <span>occupation: </span>{patient.occupation}
            <br />
            <br />
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                selectedType={selectedType}
                diagnoses={diagnoses}
            />
            <div>
                <InputLabel id="type">Choose new entry type</InputLabel>
                <Select id="type"
                    style={{maxWidth: '300px'}}
                    fullWidth
                    value={selectedType}
                    onChange={onTypeChange}
                >
                {entOptions.map(option =>
                    <MenuItem
                        key={option.label}
                        value={option.value}
                    >
                        {option.label
                    }</MenuItem>
                )}
                </Select>     
                <Button variant="contained" onClick={() => openModal()}>
                   Add a new entry
                </Button>
            </div>
            <br />
            <h2>Entries</h2>
            {patient.entries.map((entry) => {
                return (
                    <div key={entry.id} style={{border: '2px solid black', borderRadius: '15px', marginTop: "1vh"}}>
                        <ul>
                            <li>{entry.date}</li>
                            {entry.type === 'HealthCheck' ? 
                                <><MedicalInformationIcon /> <FavoriteIcon style={{color: healthCheckColor(entry.healthCheckRating)}}/></> : 
                            entry.type === 'OccupationalHealthcare' ?  <><WorkIcon /> {entry.employerName}</>: 
                            <LocalHospitalIcon />}
                            <br />
                            <em>{entry.description}</em>
                            {entry.diagnosisCodes ?
                            <ul>
                                {entry.diagnosisCodes.map((diag, ind) => {
                                    return (  
                                        <li style={{ listStyleType: 'circle' }} 
                                            key={ind}
                                        >
                                            {diag} {diagnoses.filter(d => d["code"] === `${diag}`).map(d => d.name)}
                                        </li>
                                    )
                                    })
                                }
                            </ul> :
                            null}
                            <br />
                            <span>diagnose by {entry.specialist}</span>
                        </ul>
                    </div>
                )}
            )}
        </div>
    )
}

export default PatientInfo