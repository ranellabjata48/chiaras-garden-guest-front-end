import http from "./httpService";
import api from "../config.json";

const apiEndpoint = api.apiUrl + "/edit/gallery";

export function getUserGallery() {
  return http.get(apiEndpoint);
}
