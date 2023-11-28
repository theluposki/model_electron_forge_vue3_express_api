const websocket = {
  SERVER_URL: "http://localhost:3327/api/v1"
};

const SECRETKEY = import.meta.env.VITE_SECRETKEY;

export default {
  websocket,
  SECRETKEY,
};