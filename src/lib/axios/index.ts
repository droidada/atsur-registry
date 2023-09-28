import axios from "axios";
const BASE_URL = "https://directus-admin-service-mr73ptziua-uc.a.run.app/";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
