import axios from "axios";
import { EntryWithoutId } from "../types";
import { apiBaseUrl } from "../constants";

const create = async (object: EntryWithoutId) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/:id/entries`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create
};