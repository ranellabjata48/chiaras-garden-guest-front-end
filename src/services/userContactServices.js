import http from "../../httpService";
import api from "../../../config.json";

const apiEndpoint = api.apiUrl + "/edit/contact";

export function getUserContact() {
  return http.get(apiEndpoint);
}

export function postUserContact(data) {
  return http.post(apiEndpoint, data);
}

export function deleteAllUserContact() {
  return http.delete(apiEndpoint);
}

export function updateUserContactNoImg(id, data) {
  return http.put(apiEndpoint + "/edit/" + id, data);
}

export function updateUserContact(id, data) {
  return http.put(apiEndpoint + "/" + id, data);
}

export function deleteUserContact(id) {
  return http.delete(apiEndpoint + "/" + id);
}
