import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://localhost:5000";

export function getEventType(type) {
  const endpoint = encodeURI(`/eventsType?type=${type}`);

  return axios
    .get(endpoint)
    .catch(err => console.log("Get Events by Type ERROR", error));
}
