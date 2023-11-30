import axios from "axios";
import config from "./config.js";
import { showNotification } from "./components/Layout/NotificationService.js";

export const api = axios.create({
  baseURL: config.websocket.SERVER_URL, //`http://localhost:3327/api/v1`,
  withCredentials: true,
  referrerPolicy: "origin",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      showNotification(
        "Erro de conexão: O servidor recusou a conexão.",
        "error"
      );
      console.log("Erro de conexão:", error);
    }

    if (error.response && error.response.status === 401) {
      showNotification(`Erro 401: ${error.response.data.error}`);
    }
    return Promise.reject(error);
  }
);
