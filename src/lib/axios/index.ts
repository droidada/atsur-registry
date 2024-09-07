import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
