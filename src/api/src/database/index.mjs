import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { join } from "node:path";
import { homedir } from "node:os";
import { logger } from "../utils/index.mjs";
import { readFileSync, existsSync, mkdirSync } from "node:fs";

const packageJsonPath = 'package.json';
const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');

const packageJson = JSON.parse(packageJsonContent);

const projectName = packageJson.name;
const projectDir = join(homedir(), projectName);

if (!existsSync(projectDir)) {
  mkdirSync(projectDir, { recursive: true });
}

const dbPath = join(projectDir, 'yz.db');

export const databasePromise = open({
  filename: dbPath,//'yz.db',
  driver: sqlite3.Database,
  mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
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
