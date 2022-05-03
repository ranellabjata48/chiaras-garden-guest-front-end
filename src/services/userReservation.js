import http from "./httpService";

const apiEndpointRoom = "/transaction/room";
const apiEndpointCottage = "/transaction/cottage";
const apiEndpointService = "/transaction/service";

export function getPendingRoom(id) {
  return http.get(`${apiEndpointRoom}/pending/${id}`);
}

export function getReservedRoom(id) {
  return http.get(`${apiEndpointRoom}/reserved/${id}`);
}

export function getCanceledRoom(id) {
  return http.get(`${apiEndpointRoom}/canceled/${id}`);
}

export function getCompletedRoom(id) {
  return http.get(`${apiEndpointRoom}/completed/${id}`);
}

export function cancelRoomReservation(data) {
  return http.put(`${apiEndpointRoom}/cancel/reservation`, data);
}

export function getPendingCottage(id) {
  return http.get(`${apiEndpointCottage}/pending/${id}`);
}

export function getReservedCottage(id) {
  return http.get(`${apiEndpointCottage}/reserved/${id}`);
}

export function getCanceledCottage(id) {
  return http.get(`${apiEndpointCottage}/canceled/${id}`);
}

export function getCompletedCottage(id) {
  return http.get(`${apiEndpointCottage}/completed/${id}`);
}

export function cancelCottageReservation(data) {
  return http.put(`${apiEndpointCottage}/cancel/reservation`, data);
}

export function getPendingService(id) {
  return http.get(`${apiEndpointService}/pending/${id}`);
}

export function getReservedService(id) {
  return http.get(`${apiEndpointService}/reserved/${id}`);
}

export function getCompletedService(id) {
  return http.get(`${apiEndpointService}/completed/${id}`);
}

export function getCanceledService(id) {
  return http.get(`${apiEndpointService}/canceled/${id}`);
}

export function cancelServiceReservation(data) {
  return http.put(`${apiEndpointService}/cancel/reservation`, data);
}
