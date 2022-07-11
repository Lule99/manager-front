import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const noviZahtevi = () => {
  return axios.get(`${SPRING_APP_URL}/api/zahtev/novi`);
};

export const dokumentaZaZahtev = (id) => {
  return axios.get(`${SPRING_APP_URL}/api/zahtev/dokumenta-za-zahtev/${id}`);
};

export const prihvatiZahtev = (id) => {
  return axios.get(`http://localhost:8082/api/zahtev/accept/${id}`, {
    headers: {
      Authorization: "",
    },
  });
};

export const odbijZahtev = (id, razlog) => {
  return axios.post(
    `${SPRING_APP_URL}/api/zahtev/reject/${id}/${razlog}`,
    null
  );
};
