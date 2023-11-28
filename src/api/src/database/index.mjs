import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { logger } from "../utils/index.mjs";
import { readFileSync } from "node:fs";

export const databasePromise = open({
  filename: 'src/api/yz.db',
  driver: sqlite3.Database
});

const db = await databasePromise;

export function setupDatabase() {
  try {
    const sqlSchema = readFileSync("src/api/tables.sql", "utf-8");
    db.exec(sqlSchema);
    logger.log("DATABASE 🗃️ ", "Table definitions performed successfully.");
  } catch (error) {
    logger.err("DATABASE 🗃️ ", "Error executing table definitions", error);
  }
}

process.on("SIGINT", () => {
  logger.log("APP", "closed.\n\n");
  logger.log("SIGINT", "process successfully overturned.")
  db.close();
  process.exit();
});
