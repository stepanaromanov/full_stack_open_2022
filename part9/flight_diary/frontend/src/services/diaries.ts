import axios from "axios";
import { NewDiaryEntry, DiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    try {
        const { data } = await axios.get<DiaryEntry[]>(
            `${apiBaseUrl}/diaries`
          );
        
        return data;
    } catch (error) {
    if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
    } else {
        console.error(error);
    }
    }
}

const create = async (object: NewDiaryEntry) => {
    try {
        const { data } = await axios.post<NewDiaryEntry>(
          `${apiBaseUrl}/diaries`,
          object
        );
    
        return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log(error.status)
          console.error(error.response);
      } else {
          console.error(error);
      }
    } 
}

export default {
  getAll, create
};