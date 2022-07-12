import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const search = (val) => {
  return axios.get(`${SPRING_APP_URL}/api/search?searchedString=${val.trim()}`);
};

export const advancedSearch = (type, query) => {
  return axios.get(
    `${SPRING_APP_URL}/api/metadata-search?type=${type}&query=${encodeURIComponent(
      query
    )}`
  );
};
