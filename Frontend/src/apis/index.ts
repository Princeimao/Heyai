import axios from "axios";

export const instance = axios.create({
  url: import.meta.env.BACKEND_URL,
  withCredentials: true,
});
