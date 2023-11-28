import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "..", "..");

export const upload = multer({ dest: filePath })