import http from "./httpService";
import api from "../config.json";

const apiEndpoint = api.apiUrl + "/auth";
const guestApiEndpoint = api.apiUrl + "/guest";

export function postGuestAuth(data) {
  return http.post(`${apiEndpoint}/guest/login`, data);
}

export function postGuestCreateNewAccountAuth(data) {
  return http.post(`${guestApiEndpoint}/create/account`, data);
}
