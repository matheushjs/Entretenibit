import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

export function getEventType(type) {
  const endpoint = encodeURI(`/eventsType?type=${type}`);
  return axios.get(endpoint).then(res => res.data);
}

export function getEventDate(start, end) {
  const endpoint = encodeURI(`/eventsDate?start=${start}&end=${end}`);
  return axios.get(endpoint).then(res => res.data);
}

export function getEventPricing(start, end) {
  const endpoint = encodeURI(`/eventsPricing?start=${start}&end=${end}`);
  return axios.get(endpoint).then(res => res.data);
}
