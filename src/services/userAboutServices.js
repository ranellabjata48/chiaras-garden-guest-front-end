import http from "./httpService";
import api from "../config.json";

const apiEndpoint = api.apiUrl + "/edit/about";

export function getUserAbout() {
  return http.get(apiEndpoint);
}
