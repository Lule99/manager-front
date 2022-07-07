import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const getUstanove = () => {
  return axios.get(`${SPRING_APP_URL}/api/zdravstvena-ustanova`);
};
