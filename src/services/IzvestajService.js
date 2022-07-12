import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const napraviIzvestaj = (start, end) => {
  return axios.get(`${SPRING_APP_URL}/api/izvestaj/${start}/${end}`);
};
