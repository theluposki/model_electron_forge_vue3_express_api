import { createServer } from "node:http";
import { app } from "./app.mjs";
import config from "./config.mjs";
import colors from  "@colors/colors";
import { setupDatabase } from "./database/index.mjs";
import { checkAndCreateDefaultUser } from "./database/generateUserDefault.mjs";

setupDatabase();
await checkAndCreateDefaultUser();

const server = createServer(app);

server.listen(config.app.PORT, () => {
  console.log(`[${colors.green("APP")}] ${colors.magenta("🚀 running at")} ${colors.underline("http://localhost:"+config.app.PORT)} 🔗`)
})
