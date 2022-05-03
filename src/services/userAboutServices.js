import http from "./httpService";

const apiEndpoint = "/edit/about";

export function getUserAbout() {
  return http.get(apiEndpoint);
}
