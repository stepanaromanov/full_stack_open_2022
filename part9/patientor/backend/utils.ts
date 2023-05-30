import { Gender, 
        PatientEntry,
        EntryType,
        Entry,
        Discharge,
        SickLeave,
        HealthCheckRating,
        DiagnosisEntry,
        NonSensitiveBaseEntry
        } from "./src/types";
import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseString = (text: unknown): string => {
    if (!isString(text)) {
        throw new Error(`Incorrect or missing comment ${text}`);
    }
    return text;
}

const isGender = (gender: string): gender is Gender => {
    return ['male', 'female', 'other'].includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender`);
    }
    return gender as Gender;
};

const isEntryType = (entry: string): entry is EntryType => {
    return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(entry);
};

const parseEntryType = (entry: unknown): EntryType => {
    if (!isString(entry) || !isEntryType(entry)) {
        throw new Error(`Incorrect or missing entry type`);
    }
    return entry as EntryType;
};

const isDischarge = (discharge: any): boolean => {
    return (
      discharge.date &&
      discharge.criteria &&
      isDate(discharge.date) &&
      isString(discharge.criteria)
    );
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (isDate(date)) {
        return date
    } else {
        throw new Error(`Incorrect or missing date`);
    }
};

const isSickLeave = (sickLeave: any): boolean => {
    return (
      sickLeave.startDate &&
      sickLeave.endDate &&
      isDate(sickLeave.startDate) &&
      isDate(sickLeave.endDate)
    );
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
      throw new Error(`Invalid or missing discharge field`);
    }
  
    return discharge as Discharge;
};
  
const parseSickLeave = (sickLeave: any): SickLeave => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error(`Invalid or missing sick leave field`);
    }

    return sickLeave as SickLeave;
};

const parseDiagnosisCodes = (diagCodes: any): Array<DiagnosisEntry['code']> =>  {
    if (!Array.isArray(diagCodes) || !diagCodes.every((dcode) => isString(dcode))) {
        throw new Error(`Invalid diagnosis codes`);
      }
    return diagCodes as Array<DiagnosisEntry['code']>
};

const isHealthCheckRating = (healthCheckRating: any): boolean => {
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};
  
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Invalid or missing healthcheck rating field`);
    }
    return healthCheckRating as HealthCheckRating;
}

/*
const parseArray = (entries: unknown): DiagnosisEntry[] => {
    if (!Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries`);
    }
    return entries;
};
*/

export const createNewPatient = (object: any): PatientEntry => {
    const id = uuid()
    const newPatient: PatientEntry = {
        id: id,
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    return newPatient;
};

export const createNewEntry = (object: any): Entry => {
    const getBaseEntry = (object: any): NonSensitiveBaseEntry => {
        const newBaseEntry: NonSensitiveBaseEntry = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseEntryType(object.type),
        };
        if (object.diagnosisCodes) {
            newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        };
        
        return newBaseEntry;
    }

    const newEntry = getBaseEntry(object) as Entry;
    const id = uuid();
    newEntry.id = id;

    switch (newEntry.type) {
        case EntryType.HospitalEntry:
          newEntry.discharge = parseDischarge(object.discharge);
          return newEntry
        case EntryType.OccupationalHealthcareEntry:
          newEntry.employerName = parseString(object.employerName);
          if (object.sickLeave) {
            newEntry.sickLeave = parseSickLeave(object.sickLeave);
          }
          return newEntry;
        case EntryType.HealthCheckEntry:
          newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
          return newEntry;
        default:
            throw new Error('Unknown entry type error')
    }
}
