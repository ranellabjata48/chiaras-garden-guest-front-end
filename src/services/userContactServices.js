import http from "./httpService";

const apiEndpointNewContact = "/edit/new/contact";

export function getUserContact() {
  return http.get(apiEndpointNewContact);
}
