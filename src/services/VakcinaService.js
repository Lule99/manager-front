import axios from "axios";
import { SPRING_APP_URL } from "../helpers/constants";

export const azuriranje = (azuriranjeXml) => {
  return axios.post(`${SPRING_APP_URL}/api/vakcina/azuriraj`, azuriranjeXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
