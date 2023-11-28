import { logger } from "../../utils/index.mjs";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const download_database = async (req, res) => {
  try {
    const filePath = join(__dirname, "..", "..", "..", "yz.db"); // Substitua pelo caminho real do seu arquivo yz.db

    res.setHeader("Content-Disposition", "attachment; filename=yz.db");
    res.setHeader("Content-Type", "application/octet-stream");

    const fileStream = createReadStream(filePath);

    fileStream.pipe(res);

    fileStream.on("error", (error) => {
      logger.err("download_database", "Error reading the file", error);
      res.status(500).json("error sending.");
    });

    fileStream.on("close", () => {
      logger.log("download_database", "Download completed successfully.");
    });
  } catch (error) {
    logger.err("download_database", "error sending backup", error);
  }
};
