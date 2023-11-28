const app = {
  PORT: Number(process.env.PORT) || 3327,
  NODE_ENV: process.env.NODE_ENV, // # development | production | testing
  tokenExpiresIn: 8
}

const cors = {
  origin: "http://localhost:5173",
  methods: ["OPTIONS", "GET", "POST", "PUT","DELETE"],
  credentials: true,
};

const websocket = {
  transports: ["websocket", "WebTransport"],
  cors,
};

export default {
  app,
  cors,
  websocket
}
