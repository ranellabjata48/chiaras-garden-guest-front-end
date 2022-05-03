import http from "./httpService";

const apiEndpoint = "/edit/gallery";

export function getUserGallery() {
  return http.get(apiEndpoint);
}
