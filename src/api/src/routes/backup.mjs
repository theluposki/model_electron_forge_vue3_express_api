import { Router } from "express";
import { download_database, upload_database } from "../controllers/backup/index.mjs";
import { upload } from "../middlewares/uploadFileDatabase.mjs";
const router = Router();

router.get('/', download_database);
router.post('/', upload.single('yzdb'), upload_database);

export default router;