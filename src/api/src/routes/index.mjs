import base from "./base.mjs";
import users from "./users.mjs";
import auth from "./auth.mjs";
import backup from "./backup.mjs";
import { validateToken } from "../middlewares/validToken.mjs";
const version = "/api/v1" 

export const routes = (app) => {
  app.use('/', base);
  app.use(version+'/users', validateToken, users);
  app.use(version+'/auth', auth);
  app.use(version+'/backup', backup);
}