import http from "./httpService";
import api from "../config.json";

const apiEndpoint = api.apiUrl + "/edit/home";

export function getUserHomeImg() {
  return http.get(apiEndpoint);
}
