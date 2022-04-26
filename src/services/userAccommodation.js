import http from "./httpService";
import api from "../config.json";

const apiEndpointRoom = api.apiUrl + "/services/room";
const apiEndpointCottage = api.apiUrl + "/services/cottage";
const apiEndpointService = api.apiUrl + "/services/service";

const apiEndpointRoomTransaction = api.apiUrl + "/transaction/room";
const apiEndpointCottageTransaction = api.apiUrl + "/transaction/cottage";
const apiEndpointServiceTransaction = api.apiUrl + "/transaction/service";

export function getRooms() {
  return http.get(`${apiEndpointRoom}/vacant`);
}

export function getCottages() {
  return http.get(`${apiEndpointCottage}/vacant`);
}

export function getServices() {
  return http.get(`${apiEndpointService}/vacant`);
}

export function postRoomReservation(data) {
  return http.post(
    `${apiEndpointRoomTransaction}/reservation/guest/request`,
    data
  );
}

export function postCottageReservation(data) {
  return http.post(
    `${apiEndpointCottageTransaction}/reservation/guest/request`,
    data
  );
}

export function postServiceReservation(data) {
  return http.post(
    `${apiEndpointServiceTransaction}/reservation/guest/request`,
    data
  );
}
