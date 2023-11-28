import axios from "axios";
import config from "./config.js";

export const api = axios.create({
  baseURL: `http://localhost:3327/api/v1`,
  withCredentials: true,
  referrerPolicy: "origin",
  headers: {
    "Content-Type": "application/json",
  },
});
