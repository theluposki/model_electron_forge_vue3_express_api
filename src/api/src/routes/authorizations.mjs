import { Router } from "express";
import { authorizations } from "../controllers/authorizations/authorizations.mjs";

const router = Router();

router.get('/', authorizations);

export default router;