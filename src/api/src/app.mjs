import express from "express";
import cors from "cors";
import morgan from "morgan";
import { routes } from "./routes/index.mjs";
import config from "./config.mjs";
import { errorSync } from "./middlewares/errorSync.mjs";
import { errorHandlerJSON } from "./middlewares/errorHandlerJSON.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(config.cors));
app.use(cookieParser());
app.use(express.json());
app.use(errorSync);
app.use(errorHandlerJSON);
app.use(morgan('dev'));
routes(app);

export { app }