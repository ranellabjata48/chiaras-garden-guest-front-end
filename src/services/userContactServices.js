import http from "./httpService";
import api from "../config.json";

const apiEndpointNewContact = api.apiUrl + "/edit/new/contact";

export function getUserContact() {
  return http.get(apiEndpointNewContact);
}
