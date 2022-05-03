import http from "./httpService";

const apiEndpoint = "/edit/home";

export function getUserHomeImg() {
  return http.get(apiEndpoint);
}
