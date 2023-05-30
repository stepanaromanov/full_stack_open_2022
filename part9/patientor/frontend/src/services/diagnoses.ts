import axios from "axios";
import { DiagnosisEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<DiagnosisEntry[]>(
    `${apiBaseUrl}/diagnoses`
  );
    return data
};

const create = async (object: DiagnosisEntry) => {
  const { data } = await axios.post<DiagnosisEntry>(
    `${apiBaseUrl}/diagnoses`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create
};