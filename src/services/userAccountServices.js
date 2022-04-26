import http from "./httpService";
import api from "../config.json";

const apiEndpoint = api.apiUrl + "/guest";

export function getGuest(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function updateUserAccount(id, data) {
  return http.put(`${apiEndpoint}/update/user/${id}`, data);
}

export function updateUserPassword(id, data) {
  return http.put(`${apiEndpoint}/update/user/password/${id}`, data);
}
