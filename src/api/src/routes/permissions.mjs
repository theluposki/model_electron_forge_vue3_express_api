import { Router } from "express";
import { getAll, add, getOneByID, update, deleteC, getAllByLikeName, getOneByPermission } from "../controllers/permissions/index.mjs";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOneByID);
router.get('/authorization/:permission', getOneByPermission);
router.get('/search/:permission', getAllByLikeName);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', deleteC);

export default router;