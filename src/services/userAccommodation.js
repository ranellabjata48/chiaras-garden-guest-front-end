import http from "./httpService";

const apiEndpointRoom = "/services/room";
const apiEndpointCottage = "/services/cottage";
const apiEndpointService = "/services/service";

const apiEndpointRoomTransaction = "/transaction/room";
const apiEndpointCottageTransaction = "/transaction/cottage";
const apiEndpointServiceTransaction = "/transaction/service";

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
