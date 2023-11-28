import { Router } from "express";
import { auth } from "../controllers/auth.mjs";

const router = Router();

router.post('/', auth);

export default router;