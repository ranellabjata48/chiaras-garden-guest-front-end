import http from "./httpService";

const apiEndpoint = "/auth";
const guestApiEndpoint = "/guest";

export function postGuestAuth(data) {
  return http.post(`${apiEndpoint}/guest/login`, data);
}

export function postGuestCreateNewAccountAuth(data) {
  return http.post(`${guestApiEndpoint}/create/account`, data);
}
