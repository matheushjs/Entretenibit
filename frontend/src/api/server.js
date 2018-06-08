import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

export function getEventType(type) {
  const endpoint = encodeURI(`/eventsType?type=${type}`);

  return axios.get(endpoint).then(data => console.log(data));
}
