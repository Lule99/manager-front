import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const noviZahtevi = () => {
  return axios.get(`${SPRING_APP_URL}/api/zahtev/novi`);
};
